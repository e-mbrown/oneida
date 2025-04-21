import {
    Sidebar,
    SidebarContent,
    SidebarFooter,
    SidebarGroup,
    SidebarGroupContent,
    SidebarGroupLabel,
    SidebarTrigger,
    SidebarMenu,
    SidebarMenuButton,
    SidebarMenuItem,
  } from "@/components/ui/sidebar"
  
  const items = [
    {
      title: "No markers",
      url: "#",
      // icon:
    },
    {
      title: "Fish markers",
      url: "#",
      // icon:
    },
    {
      title: "Bay markers",
      url: "#",
      // icon:
    },
  ]


  export function MapSbar() {
    return (
      <Sidebar collapsible="icon">
        <SidebarContent>
          <SidebarGroup>
            <SidebarGroupLabel> The Oneida Lake Map</SidebarGroupLabel>
            <SidebarGroupContent>
              <SidebarMenu>
                {items.map((item) => (
                  <SidebarMenuItem key={item.title}>
                    <SidebarMenuButton asChild>
                      <a href ={item.url}>
                        <span>{item.title}</span>
                      </a>
                    </SidebarMenuButton>
                  </SidebarMenuItem>
                ))}
              </SidebarMenu>
            </SidebarGroupContent>
          </SidebarGroup>
        </SidebarContent>
        <SidebarFooter>
        <SidebarTrigger/>
        </SidebarFooter>
      </Sidebar>
    )
  }
  