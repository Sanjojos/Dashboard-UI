import React, { useEffect, useState } from "react"
import { AppSidebar } from "@/components/app-sidebar"
import { SiteHeader } from "@/components/site-header"
import {
  Command,
  CommandInput,
} from "@/components/ui/command"
import {
  Menubar,
  MenubarMenu,
  MenubarTrigger,
} from "@/components/ui/menubar"
import { SidebarInset, SidebarProvider } from "@/components/ui/sidebar"
import { DataTable } from "@/components/data-table"
import { Skeleton } from "@/components/ui/skeleton"

import data from "./data.json"

export const DashBoard = () => {
  const [loading, setLoading] = useState(true)
  const [searchQuery, setSearchQuery] = useState("")
  const [filteredData, setFilteredData] = useState(data)

  
  useEffect(() => {
    const timer = setTimeout(() => setLoading(false), 2000)
    return () => clearTimeout(timer)
  }, [])

 
  useEffect(() => {
    console.log("Search query changed:", searchQuery)
    console.log("Original data:", data)
    
    if (!searchQuery || searchQuery.trim() === "") {
      console.log("Empty search, showing all data")
      setFilteredData(data)
      return
    }

    const query = searchQuery.toLowerCase().trim()
    console.log("Processing query:", query)

    const result = data.filter(item => {
      const header = String(item.header || "").toLowerCase().trim()
      const type = String(item.type || "").toLowerCase().trim()
      
      console.log("Checking item:", { header, type, query })
      
      const matches = header.includes(query) || type.includes(query)
      console.log("Match result:", matches)
      
      return matches
    })
    
    console.log("Final filtered results:", result)
    console.log("Number of results:", result.length)
    
    setFilteredData(result)
  }, [searchQuery])

 
  const handleSearchChange = (value) => {
    console.log("CommandInput value changed to:", value)
    setSearchQuery(value)
  }

  return (
    <SidebarProvider>
      <AppSidebar variant="inset" />
      <SidebarInset>
        <SiteHeader />
        <div className="flex flex-1 flex-col">
          <div className="@container/main flex flex-1 flex-col gap-2">
            <div className="flex flex-col gap-4 py-4 md:gap-6 md:py-6">
              <div className="sticky top-4 z-10 mb-4" />

              
              {loading ? (
                <Skeleton className="h-8 w-48 mx-auto mb-4" />
              ) : (
                <h1 className="text-2xl font-bold text-center text-gray-800 mb-8">
                  Articles
                </h1>
              )}

              
              {loading ? (
                <div className="flex justify-center gap-4 mb-6">
                  {[...Array(4)].map((_, i) => (
                    <Skeleton key={i} className="h-10 w-40 rounded-full" />
                  ))}
                </div>
              ) : (
                <div className="flex justify-center mb-6">
                  <Menubar className="gap-4 px-4 py-2 rounded-full shadow-sm bg-white border border-gray-300">
                    <MenubarMenu>
                      <MenubarTrigger className="min-w-[120px] justify-center rounded-lg">
                        Generated Articles
                      </MenubarTrigger>
                    </MenubarMenu>
                    <MenubarMenu>
                      <MenubarTrigger className="min-w-[120px] justify-center rounded-lg">
                        Published Articles
                      </MenubarTrigger>
                    </MenubarMenu>
                    <MenubarMenu>
                      <MenubarTrigger className="min-w-[120px] justify-center rounded-lg">
                        Scheduled Articles
                      </MenubarTrigger>
                    </MenubarMenu>
                    <MenubarMenu>
                      <MenubarTrigger className="min-w-[120px] justify-center rounded-lg">
                        Archived Articles
                      </MenubarTrigger>
                    </MenubarMenu>
                  </Menubar>
                </div>
              )}

              
              {loading ? (
                <Skeleton className="h-10 w-full max-w-xl mx-auto rounded-lg" />
              ) : (
                <div className="max-w-xl mx-auto w-full">
                  <Command className="bg-white border rounded-lg">
                    <CommandInput
                      placeholder="Search for Title & Type..."
                      value={searchQuery}
                      onValueChange={handleSearchChange}
                    />
                  </Command>
                  
                  <div className="mt-2 text-sm text-gray-500">
                    Showing {filteredData.length} of {data.length} articles
                    {searchQuery && <span> for "{searchQuery}"</span>}
                  </div>
                </div>
              )}

              
              {loading ? (
                <div className="max-w-5xl mx-auto w-full space-y-3 mt-6">
                  {[...Array(5)].map((_, i) => (
                    <Skeleton key={i} className="h-10 w-full" />
                  ))}
                </div>
              ) : (
                <DataTable 
                  key={`datatable-${filteredData.length}-${searchQuery}`}
                  data={filteredData} 
                />
              )}
            </div>
          </div>
        </div>
      </SidebarInset>
    </SidebarProvider>
  )
}