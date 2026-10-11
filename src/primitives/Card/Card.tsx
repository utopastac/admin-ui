import React from 'react';
import styles from './Card.module.css';

interface CardProps {
  children: React.ReactNode;
  active?: boolean;
  hoverable?: boolean;
  onClick?: () => void;
  className?: string;
}

const Card: React.FC<CardProps> = ({
  children,
  active = false,
  hoverable = true,
  onClick,
  className = '',
}) => {
  const cardClass = [
    styles.card,
    active && styles.active,
    hoverable && styles.hoverable,
    className
  ].filter(Boolean).join(' ');

  return (
    <div className={cardClass} onClick={onClick}>
      {children}
    </div>
  );
};

export default Card;
