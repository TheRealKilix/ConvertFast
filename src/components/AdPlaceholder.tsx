interface AdPlaceholderProps {
  location: 'header' | 'content' | 'footer';
  className?: string;
}

export function AdPlaceholder({ location, className = '' }: AdPlaceholderProps) {
  const sizes = {
    header: { height: 'h-20 sm:h-24', text: '728x90 - Bannière' },
    content: { height: 'h-64 sm:h-72', text: '300x250 - Encadré' },
    footer: { height: 'h-24 sm:h-28', text: '728x90 - Bannière' },
  };

  const size = sizes[location];

  return (
    <div
      className={`ad-placeholder ${size.height} ${className}`}
      aria-label="Emplacement publicitaire"
    >
      <div className="text-center">
        <p className="text-slate-500 text-sm">Publicité</p>
        <p className="text-slate-600 text-xs mt-1">{size.text}</p>
      </div>
    </div>
  );
}
