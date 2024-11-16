import { Config } from "@netlify/edge-functions";
import agents from "../../agents.json" with { type: "json" };

// eslint-disable-next-line import/no-anonymous-default-export
export default async (request: Request) => {

  // Get the user agent string of the requester
  const ua = request.headers.get('user-agent') || '';
  const url = new URL(request.url);

  // Check against our list of known AI bots
  let isBot = false;
  agents.forEach((agent: string) => {
    if (ua?.toLowerCase().includes(agent.toLowerCase())) {
      isBot = true;
      return;
    }
  })

  if (url.pathname.match(/\.php$/i)) {
    isBot = true;
  }

  // If the requester is an AI bot, disallow with a 401
  if(isBot) {
    return new Response(null, { status: 401 });
  }
  // Otherwise, continue with the request as normal
  else {
    return;
  }
};

// This edge function is executed for all requests across the site
export const config: Config = {
  path: "/*",
};