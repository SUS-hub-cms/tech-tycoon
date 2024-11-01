import MainMenu from "@/components/main-menu"
import { MusicProvider } from "@/contexts/music-context"
import { SandboxProvider } from "@/contexts/sandbox-context"
import { SaveProvider } from "@/contexts/save-context"
import MusicPlayer from "@/components/audio/music-player"

export default function Page() {
  return (
    <SandboxProvider>
      <MusicProvider>
        <SaveProvider>
          {/* Uncomment when music file is added */}
          {/* <MusicPlayer /> */}
          <MainMenu />
        </SaveProvider>
      </MusicProvider>
    </SandboxProvider>
  )
}
