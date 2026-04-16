import { NextResponse } from "next/server";
import bcrypt from "bcryptjs";
import prisma from "@/lib/prisma";

export async function POST(request: Request) {
  try {
    const { token, password } = await request.json();

    if (!token || !password) {
      return NextResponse.json({ error: "Eksik məlumat" }, { status: 400 });
    }

    // 1. Find User by Token
    const user = await prisma.user.findUnique({
      where: { resetToken: token },
    });

    if (!user) {
      return NextResponse.json({ error: "Sıfırlama linki yanlışdır" }, { status: 400 });
    }

    // 2. Check Expiry
    if (!user.resetTokenExpiry || user.resetTokenExpiry < new Date()) {
      return NextResponse.json({ error: "Sıfırlama linki vaxtı keçib" }, { status: 400 });
    }

    // 3. Hash New Password
    const hashedPassword = await bcrypt.hash(password, 10);

    // 4. Update User & Clear Token
    await prisma.user.update({
      where: { id: user.id },
      data: {
        password: hashedPassword,
        resetToken: null,
        resetTokenExpiry: null,
      },
    });

    return NextResponse.json({ success: true, message: "Şifrə uğurla yeniləndi" });
  } catch (err: any) {
    console.error("Reset Password Error:", err);
    return NextResponse.json({ error: "Server xətası baş verdi" }, { status: 500 });
  }
}
