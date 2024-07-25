import { cn } from '@/lib/utils';
import { PageDirection } from '@/types/types';
import { ArrowLeft, ArrowRight } from 'lucide-react';
import React from 'react';

export type PaginationControlProps = {
  currentPage: number;
  totalPages: number;
  onClick: (direction: PageDirection) => void;
};

export default function PaginationControl({
  currentPage,
  totalPages,
  onClick,
}: PaginationControlProps) {
  return (
    <div className="w-full flex justify-between items-center space-x-4 mt-4">
      <div className="flex-1 flex justify-start">
        {currentPage > 1 && (
          <PaginationButton
            direction="previous"
            currentPage={currentPage}
            totalPages={totalPages}
            onClick={() => onClick('previous')}
          />
        )}
      </div>
      <span>
        Page <b>{currentPage}</b> of {totalPages}
      </span>
      <div className="flex-1 flex justify-end">
        {currentPage < totalPages && (
          <PaginationButton
            direction="next"
            currentPage={currentPage}
            totalPages={totalPages}
            onClick={() => onClick('next')}
          />
        )}
      </div>
    </div>
  );
}

type PaginationButtonProps = {
  direction: PageDirection;
  currentPage: number;
  onClick: () => void;
  totalPages: number;
};

function PaginationButton({
  direction,
  currentPage,
  onClick,
  totalPages,
}: PaginationButtonProps) {
  return (
    <button
      onClick={onClick}
      className={cn(
        'flex items-center space-x-2 p-2 bg-gray-200 hover:bg-gray-300 rounded-lg',
        direction === 'previous' && currentPage <= 1 && 'invisible',
        direction === 'next' && currentPage >= totalPages && 'invisible'
      )}
    >
      {direction === 'previous' && (
        <>
          <ArrowLeft size={16} />
          Page {currentPage - 1}
        </>
      )}
      {direction === 'next' && (
        <>
          Page {currentPage + 1}
          <ArrowRight size={16} />
        </>
      )}
    </button>
  );
}
