import { startCase } from "lodash"

import OrgControl from "./_components/OrgControl"
import { auth } from "@clerk/nextjs/server"

export async function generateMetadata() {
    const {orgSlug} = auth()
    return {
        title: startCase(orgSlug || "organization"),
    }
}

const organizationIdLayout = ({children}:{children: React.ReactNode}) => {
    return (
        <>
            <OrgControl />
            {children}
        </>
    )
}

export default organizationIdLayout