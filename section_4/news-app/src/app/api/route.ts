export const GET = (requet: Request) => {
  console.log({ requet });

  return new Response("Hello!");
};

// export const POST = (request: Request) => {}
