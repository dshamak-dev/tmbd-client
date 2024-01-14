import React from "react";
import { MovieDTO } from "src/app/app.model";
import cn from 'classnames';

interface MovieCardProps {
  data: MovieDTO;
  className?: string;
}

export const MovieCard: React.FC<MovieCardProps> = ({ data, className }) => {
  const { title, backdrop_path, poster_path } = data;

  return (
    <div className={cn('border shadow-md rounded', className)}>
      <div>
        <img src={poster_path} />
      </div>
      <div>
        <h2>{title}</h2>
      </div>
    </div>
  );
};
