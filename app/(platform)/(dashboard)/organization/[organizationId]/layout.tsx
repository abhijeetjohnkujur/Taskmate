import OrgControl from "./_components/OrgControl"

const organizationIdLayout = ({children}:{children: React.ReactNode}) => {
    return (
        <>
            <OrgControl />
            {children}
        </>
    )
}

export default organizationIdLayout