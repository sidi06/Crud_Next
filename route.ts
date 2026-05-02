
let users: { id: number; name: string }[] = [];


export async function GET() {
  return Response.json(users);
}

export async function POST(req: Request) {
  const body = await req.json();

  const newUser = {
    id: Date.now(),
    name: body.name,
  };

  users.push(newUser);

  return Response.json(newUser);
}

export async function PUT(req: Request) {
  const body = await req.json();

  users = users.map((u) =>
    u.id === body.id ? { ...u, name: body.name } : u
  );

  return Response.json({ message: "updated" });
}

export async function DELETE(req: Request) {
  const body = await req.json();

  users = users.filter((u) => u.id !== body.id);

  return Response.json({ message: "deleted" });
}