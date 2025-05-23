import * as React from "react"
import { ChevronRight } from "lucide-react"

import { SearchForm } from "@/components/search-form"
import { VersionSwitcher } from "@/components/version-switcher"
import {
  Collapsible,
  CollapsibleContent,
  CollapsibleTrigger,
} from "@/components/ui/collapsible"
import {
  Sidebar,
  SidebarContent,
  SidebarGroup,
  SidebarGroupContent,
  SidebarGroupLabel,
  SidebarHeader,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
  SidebarRail,
} from "@/components/ui/sidebar"
import { Newspaper } from 'lucide-react'; 
import { Link } from "react-router-dom"

// Sample data
const data = {
  versions: ["1.0.1", "1.1.0-alpha", "2.0.0-beta1"],
  navMain: [
    {
      title: "Articles",
      url: "#",
      items: [
        { title: "Create Article", url: "#" },
        { title: "Generated Articles", url: "#" },
        { title: "Keyword Projects", url: "#" },
        { title: "AI Keyword to Article", url: "#" },
        { title: "Steal competitor Keyword", url: "#" },
        { title: "Import Keyword from GSC", url: "#" },
        { title: "Manual Keyword to Article", url: "#" },
        { title: "Bulk Keyword to Article", url: "#" },
        { title: "Longtail Keyword to Article", url: "#" },
        { title: "Article Setting", url: "#" },
      ],
    },
    {
      title: "Auto blog",
      url: "#",
      items: [
        { title: "Internal Links", url: "#" },
        { title: "Free Backlinks", url: "#" },
        { title: "Integrations", url: "#" },
        { title: "Subscription", url: "#" },
        { title: "Affiliate Program", url: "#" },
        { title: "Help center", url: "#" },
        { title: "Updates", url: "#" },
        { title: "Live Chat Support", url: "#" },
        
      ],
    },
    
  ],
}

export function AppSidebar(props) {
  return (
    <Sidebar {...props}>
      <SidebarHeader>
        <VersionSwitcher versions={data.versions} defaultVersion={data.versions[0]} />
        <SearchForm />
      </SidebarHeader>

      <SidebarContent className="gap-0">
        {data.navMain.map((item) =>
          item.title === "Articles" ? (
            <Collapsible key={item.title} defaultOpen className="group/collapsible">
              <SidebarGroup>
                <SidebarGroupLabel
                  asChild
                  className="group/label text-sm font-normal text-sidebar-foreground hover:bg-sidebar-accent hover:text-sidebar-accent-foreground"
                >
                  <CollapsibleTrigger>
                    {item.title}
                    <ChevronRight className="ml-auto transition-transform group-data-[state=open]/collapsible:rotate-90" />
                  </CollapsibleTrigger>
                </SidebarGroupLabel>
                <CollapsibleContent>
                  <SidebarGroupContent>
                    <SidebarMenu>
                      {item.items.map((subItem) => (
                        <SidebarMenuItem key={subItem.title}>
                          <SidebarMenuButton asChild isActive={subItem.isActive}>
                           <Link to="/login">{subItem.title}</Link>

                          </SidebarMenuButton>
                        </SidebarMenuItem>
                      ))}
                    </SidebarMenu>
                  </SidebarGroupContent>
                </CollapsibleContent>
              </SidebarGroup>
            </Collapsible>
          ) : (
            <SidebarGroup key={item.title}>
              <SidebarGroupLabel asChild className="text-sm font-normal text-sidebar-foreground hover:bg-sidebar-accent hover:text-sidebar-accent-foreground">
             <Link to="/login">{item.title}</Link>
              </SidebarGroupLabel>
              <SidebarGroupContent>
                <SidebarMenu>
                  {item.items.map((subItem) => (
                    <SidebarMenuItem key={subItem.title}>
                      <SidebarMenuButton asChild isActive={subItem.isActive}>
                        <Link to="/login">{subItem.title}</Link>
                      </SidebarMenuButton>
                    </SidebarMenuItem>
                  ))}
                </SidebarMenu>
              </SidebarGroupContent>
            </SidebarGroup>

          )
        )}
      </SidebarContent>

      <SidebarRail />
    </Sidebar>
  );
}
