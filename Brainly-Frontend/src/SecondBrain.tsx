"use client"

// import type React from "react"

import Sidebar from "./components/Sidebar"
import { Button } from "./components/Button"
import { ShareIcon } from "./assets/ShareIcon"
import { PlusIcon } from "./assets/PlusIcon"
import { Card } from "./components/Card"


export default function SecondBrain() {
    // @ts-ignore
  
  return (
    <div className="flex h-screen bg-white">
      {/* Sidebar */}
      <Sidebar/>

      {/* Content */}
      <div className="flex-1 p-6">

        <nav className="flex justify-between items-center mb-6">
          <h2 className="text-2xl font-bold text-gray-800">All Notes</h2>
          <div className="flex gap-2">
            <Button variant="primary" text="Add Content" startIcon={<PlusIcon/>}/>
            <Button variant="secondary" text="Share Brain" startIcon={<ShareIcon/>}/>
          </div>
        </nav>

        {/* Notes Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4 p-4 w-full">          
          <Card cardInfo='Interesting' contentType="youtube" tags={["cool", "software"]} embeddedLink="https://www.youtube.com/watch?v=NwZ26lxl8wU" description="This is a learning video to watch as it explaina how notion despite bieng a completely online platform handles so many concurrent users and stores their data"/>
          <Card cardInfo="Random" contentType="twitter" embeddedLink="https://x.com/aaditsh/status/1904388143622877618" tags={["tweet"]} />
        </div>
      </div>
    </div>
  )
}

