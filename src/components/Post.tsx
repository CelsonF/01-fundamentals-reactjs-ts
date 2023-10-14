import { ChangeEvent, FormEvent, useState } from 'react';

import { format, formatDistanceToNow } from 'date-fns';
import { ptBR } from 'date-fns/locale';
import { Avatar } from './Avatar';
import { Comment } from './Comment';

import styles from './Post.module.css';


interface Author {
    name: string;
    avatarUrl: string;
    role: string;
}

interface Content {
    type:'paragraph' | 'link';
    content:string;
}


export interface PostType {
    id: number;
    author: Author;
    publishedAt: Date;
    content:Content[];
}


interface PostProps { 
    post: PostType;
}


export function Post({post}: PostProps) {

   
    
    const [comments,setComments]  = useState([
        'Post muito bacana, hein?!'
    ])

    const [newCommentText,setNewCommentText] = useState('')

    const publishedDateFormatted = format(post.publishedAt, "d 'de' LLLL 'às' HH'h':mm'm'", {
        locale: ptBR
    })

    const publishedDateRelativeToNow = formatDistanceToNow(post.publishedAt, {
        locale: ptBR,
        addSuffix: true
    })

    function handleCreateNewComment(event:FormEvent) {
        event.preventDefault();

        setComments([...comments, newCommentText])
        setNewCommentText('')
    }

    function handleNewCommentChange(event:ChangeEvent<HTMLTextAreaElement>) {
        event.target.setCustomValidity('');
        setNewCommentText(event.target.value);
    }

    function handleNewCommentInvalid(event:ChangeEvent<HTMLTextAreaElement>) {
       event.target.setCustomValidity('Essa mensagem não pode ser vazia!')
    }

    function deleteComment(commentToDelete:string) {
        const commentsWithoutDeletedOne = comments.filter(comment => {
            return comment !== commentToDelete;
        })

        setComments(commentsWithoutDeletedOne)
    }

    const isNewCommentEmpty = newCommentText.length === 0;

    return (
       <article className={styles.post}>
            <header> 
                <div className={styles.author}>
                    <Avatar src={post.author.avatarUrl} />
                    <div className={styles.authorInfo}>
                        <strong> {post.author.name} </strong>
                        <span> {post.author.role} </span>
                    </div>
                </div>
                <time title={publishedDateFormatted} dateTime={post.publishedAt.toISOString()}> 
                    {publishedDateRelativeToNow}
                </time>
            </header>

            <div className={styles.content}>
                {
                    post.content.map(line => {
                        if (line.type === 'paragraph') {
                            return <p key={line.content}>{line.content}</p>;
                        } else if (line.type === 'link') {
                            return <ul key={line.content} className={styles.listNotOrdered}>
                                        <li>
                                            <a href='#'> {line.content} </a>
                                        </li>
                                    </ul>
                        }
                    }) 
                }

            </div>

            <form onSubmit={handleCreateNewComment} className={styles.commentForm}>
                <strong> Deixe seu Feedback </strong>
                <textarea 
                    name='comment'
                    onChange={handleNewCommentChange}
                    placeholder='Deixe um comentário'
                    value={newCommentText}
                    onInvalid={handleNewCommentInvalid}
                    required
                />

                <footer>
                    <button type="submit" disabled={isNewCommentEmpty}> Publicar </button>
                </footer>
            </form>

            <div className={styles.commentList}>
                {
                    comments.map(comment => {
                        return (
                            <Comment 
                                onDeleteComment={deleteComment}
                                key={comment} 
                                content={comment}
                            />
                        )
                    })
                }
            </div>

       </article>
    )
}