type ArrowIconProps = {
  diagonal?: boolean
}

export function ArrowIcon({ diagonal = false }: ArrowIconProps) {
  return (
    <svg aria-hidden="true" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.7" className="h-4 w-4">
      {diagonal ? (
        <path d="M5 19 19 5M8 5h11v11" strokeLinecap="round" strokeLinejoin="round" />
      ) : (
        <path d="M4 12h16m-6-6 6 6-6 6" strokeLinecap="round" strokeLinejoin="round" />
      )}
    </svg>
  )
}
