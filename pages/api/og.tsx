import { ImageResponse } from "@vercel/og"
import { NextRequest } from "next/server"
import { LogoNoFill } from "../../components/logos/index"

export const config = {
  runtime: "edge",
}

const fontLight = fetch(
  new URL("../../assets/fonts/Montserrat-Light.ttf", import.meta.url),
).then((res) => res.arrayBuffer())
const fontRegular = fetch(
  new URL("../../assets/fonts/Montserrat-Regular.ttf", import.meta.url),
).then((res) => res.arrayBuffer())

export default async function handler(req: NextRequest) {
  try {

    const fontLightData = await fontLight
    const fontRegularData = await fontRegular


    const { searchParams } = new URL(req.url)

    // ?title=<title>
    const title = searchParams.has("title")
      ? searchParams.get("title")?.slice(0, 100)
      : "title not specified"
    const description = searchParams.has("description")
      ? searchParams.get("description")?.slice(0, 1024)
      : "Description not specified 😔\n\nLorem ipsum dolor, sit amet consectetur adipisicing elit. Iste amet obcaecati ad aliquam sunt iusto atque recusandae. Praesentium, reprehenderit vel? In consequatur nemo dolorum eius fugit, quo laboriosam labore itaque!"

    return new ImageResponse(
      (
        <main
          style={{
            display: "flex",
            flexDirection: "row",
            width: "100%",
            height: "100%",
          }}
        >
          <section
            style={{
              backgroundColor: "#1b1a1d",
              height: "100%",
              width: "80%",
              flex: 1,
              display: "flex",
              flexDirection: "column",
              flexWrap: "nowrap",
              fontFamily: "Montserrat",
              padding: "48px",
            }}
          >
            <div
              style={{
                display: "flex",
                flexDirection: "row",
                alignItems: "center",
                justifyContent: "flex-start",
                width: "100%",
              }}
            >
              <LogoNoFill
                style={{
                  width: "50px",
                  height: "50px",
                }}
              />
              <h1
                style={{
                  color: "#42424d",
                  fontSize: "32px",
                  marginLeft: "16px",
                }}
              >
                Billzonian Language
              </h1>
            </div>
            <h2
              style={{
                fontSize: "80px",
                color: "#f5f5fb",
                whiteSpace: "pre-wrap",
                marginTop: "0.25em",
                fontWeight: 300,
              }}
            >
              {title}
            </h2>
            <p
              style={{
                fontSize: "32px",
                color: "#a2a2ae",
                whiteSpace: "pre-wrap",
                marginTop: "0.25em",
              }}
            >
              {description}
            </p>
          </section>
          <section
            style={{
              backgroundColor: "#b22ef9",
              width: "1%",
              height: "100%",
            }}
          ></section>
        </main>
      ),
      {
        width: 1200,
        height: 630,
        // debug: true,
        fonts: [
          {
            name: "Montserrat",
            data: fontRegularData,
            weight: 400,
          },
          {
            name: "Montserrat",
            data: fontLightData,
            weight: 300,
          },
        ],
        emoji: "twemoji"
      },
    )
  } catch (e: any) {
    console.log(`${e.message}`)
    return new Response(`Failed to generate the image`, {
      status: 500,
    })
  }
}
