import Logo from "@/components/ui/Logo";
import { Button } from "@/components/ui/button";
import { OrganizationSwitcher, UserButton } from "@clerk/nextjs";
import { Plus } from "lucide-react";
import { MobileSidebar } from "./MobileSidebar";
import Formpopover from "@/components/ui/form/Formpopover";

const Navbar = async () => {
    

  return (
    <nav className="fixed z-50 px-4 top-0 w-full h-14 border-b shadow-sm bg-white flex items-center">
        <MobileSidebar />
        <div className="flex items-center gap-x-4">
            <div className="hidden md:flex">
                <Logo />
            </div>
            <Formpopover
            align="start"
            side="bottom"
            sideOffset={18}
            >
            <Button size="sm" className="rounded-sm hidden md:block py-1.5 px-2">
                Create
            </Button>
            </Formpopover>
            
            <Formpopover>
            <Button size={"sm"} className="rounded-md block md:hidden">
                <Plus className="w-4 h-4" />
            </Button>
            </Formpopover>
        </div>

        <div className="ml-auto flex items-center gap-x-2">
                <OrganizationSwitcher
                afterCreateOrganizationUrl={"/organization/:id"}
                afterSelectOrganizationUrl={"/organization/:id"}
                afterLeaveOrganizationUrl={"/select-org"}
                appearance={{
                    elements: {
                        rootBox: {
                            display: "flex",
                            justifyContent: "center",
                            alignItems: "center"
                        }
                    }
                }}
                />
                <UserButton
                afterSignOutUrl="/"
                appearance={{
                    elements: {
                        avatarBox: {
                            height: 30,
                            width: 30
                        }
                    }
                }}
                />
        </div>
    </nav>
  )
}

export default Navbar;