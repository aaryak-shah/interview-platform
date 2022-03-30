import React, { useEffect } from "react"
import "./VC.css"
import { config } from "./VCConfig"
import { useSelector, useDispatch } from "react-redux"

function VC({ sid }) {
  const user = useSelector((state) => state.user)
  const dispatch = useDispatch()

  const loadJitsiScript = () =>
    new Promise((resolve) => {
      const script = document.createElement("script")
      script.src = "https://meet.jit.si/external_api.js"
      script.async = true
      script.onload = resolve
      document.body.appendChild(script)
    })

  useEffect(() => {
    const initialiseJitsi = async () => {
      if (!window.JitsiMeetExternalAPI) {
        await loadJitsiScript()
      }

      return new window.JitsiMeetExternalAPI("meet.jit.si", {
        parentNode: document.getElementById("jitsi"),
        roomName: sid,
        ...config,
        userInfo: {
          email: user.email,
          displayName: user.name,
        },
      })
    }

    let jitsi
    initialiseJitsi()
      .then((resp) => {
        jitsi = resp
        jitsi.on("videoConferenceLeft", (e) => {
          if (e) console.error(e)
          window.location.replace(`/`)
        })
      })
      .catch((e) => {
        console.log(e)
        // window.location.replace(`/`)
      })
    return () => {
      jitsi?.dispose?.()
    }
  }, [sid])

  return (
    <div className="jitsi-container">
      <div id="jitsi"></div>
    </div>
  )
}

export default VC
