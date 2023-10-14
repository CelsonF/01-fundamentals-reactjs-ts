import { useState } from 'react';
import { ThumbsUp , Trash } from '@phosphor-icons/react';
import { Avatar } from './Avatar';
import styles from './Comment.module.css';


interface CommentProps {
    content: string;
    onDeleteComment: (content:string) => void;
}



export function Comment({content, onDeleteComment} : CommentProps) {
    
    const [likeCount,setLikeCount] = useState(0);
    
    function handleDeleteComment() {
        onDeleteComment(content);
    }

    function handleLikeComment() {
        setLikeCount((state) => {
            return state + 1;
        });
    }

    return (
        <div className={styles.comment}>
            <Avatar hasBorder={false} src="https://avatars.githubusercontent.com/u/29209254?v=4" alt="Celson Fernando" />
            <div className={styles.commentBox}>
                <div className={styles.commentContent}>
                    <header>
                        <section className={styles.authorTime}>
                            <strong> Celson Fernando </strong>
                            <time title="04 de Outubro às 21h:29m" dateTime="2023-10-04 21:29:00"> Cerca de 1h atrás</time>
                        </section>
                        <button onClick={handleDeleteComment} title="Deletar comentário">
                            <Trash size={24} />
                        </button>
                    </header>
                    <p> {content} </p>
                </div> 
            
            
                <footer>
                  <button onClick={handleLikeComment}>
                    <ThumbsUp size={20} />
                    Aplaudir <span> {likeCount} </span>
                  </button>
                </footer>
            
            </div>
        </div>
    )
} 