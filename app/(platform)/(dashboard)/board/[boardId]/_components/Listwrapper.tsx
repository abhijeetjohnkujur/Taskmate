

interface ListwrapperProps {
    children: React.ReactNode;
}


const Listwrapper = ({
children
}:ListwrapperProps) => {
  return (
    <li className="shrink-0 h-full w-[272px] select-none">
        {children}
    </li>
  )
}

export default Listwrapper;