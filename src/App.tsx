import { SidebarProvider } from "@/components/ui/sidebar"
import { MapSbar } from './components/custom/map-sbar'
import Map from './components/custom/map'
import './App.css'

function App() {

  return (
    <SidebarProvider>
      <MapSbar />
        <main className=" pt-[25%]">
          <Map />
        </main>
    </SidebarProvider>
  )
}

export default App
