import { z } from "zod";
import { fail, ok, parseJson } from "@/lib/api-utils";
import { mapMenuItem } from "@/lib/backend";
import { prisma } from "@/lib/prisma";

const updateMenuItemSchema = z.object({
  name: z.string().min(2).optional(),
  description: z.string().optional(),
  price: z.number().positive().optional(),
  categoryId: z.string().optional(),
  emoji: z.string().optional(),
  isAvailable: z.boolean().optional(),
  isBestseller: z.boolean().optional(),
  isVeg: z.boolean().optional(),
  spiceLevel: z.enum(["NONE", "MILD", "MEDIUM", "HOT", "EXTRA_HOT"]).optional(),
  preparationTime: z.number().int().positive().optional(),
});

export async function PUT(
  request: Request,
  { params }: { params: Promise<{ slug: string; id: string }> }
) {
  const { id } = await params;
  const parsed = await parseJson(request, updateMenuItemSchema);
  if (parsed.error) return fail("Invalid update payload", 422, parsed.error);

  try {
    const item = await prisma.menuItem.update({
      where: { id },
      data: {
        ...parsed.data,
        spiceLevel: parsed.data.spiceLevel as any,
      },
    });
    return ok(mapMenuItem(item));
  } catch {
    return fail("Menu item not found", 404);
  }
}

export async function DELETE(
  _request: Request,
  { params }: { params: Promise<{ slug: string; id: string }> }
) {
  const { id } = await params;
  try {
    await prisma.menuItem.delete({ where: { id } });
    return ok({ deleted: true });
  } catch {
    return fail("Menu item not found", 404);
  }
}
