
export const ArrowDown = ({isOptionsOpen}: {isOptionsOpen: boolean}) => {

    return (
        <svg className="w-6 h-6 text-gray-800 dark:text-white" aria-hidden="true"
             xmlns="http://www.w3.org/2000/svg" width="24" height="24" fill="none"
             viewBox="0 0 24 24"
             style={isOptionsOpen ? {transform: 'rotate(180deg)'} : {transform: 'rotate(0deg)', cursor: "pointer"}}
        >
            <path stroke="currentColor" strokeLinecap="round" strokeLinejoin="round"
                  strokeWidth="2" d="m19 9-7 7-7-7"/>
        </svg>
    )
}