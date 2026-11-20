import { NextRequest, NextResponse } from "next/server";
import { INITIAL_CERTIFICATES } from "../../../lib/dataStore";
import { Certificate } from "../../../types";

let serverCerts: Certificate[] = [...INITIAL_CERTIFICATES];

export async function GET(req: NextRequest) {
  const { searchParams } = new URL(req.url);
  const username = searchParams.get("username");

  if (username) {
    const userCerts = serverCerts.filter((c) => c.ownerUsername === username);
    return NextResponse.json({ success: true, certificates: userCerts });
  }

  return NextResponse.json({ success: true, certificates: serverCerts });
}

export async function POST(req: NextRequest) {
  try {
    const cert: Certificate = await req.json();

    if (!cert.title || !cert.issuingOrg) {
      return NextResponse.json(
        { success: false, error: "Title and issuing organization are required." },
        { status: 400 }
      );
    }

    const newCert: Certificate = {
      ...cert,
      id: cert.id || `cert-${Date.now()}`,
      verified: true,
      credentialId: cert.credentialId || `DA-${Date.now().toString().slice(-6)}`,
      verificationUrl: cert.verificationUrl || `https://developersapp.io/verify/DA-${Date.now().toString().slice(-6)}`,
    };

    serverCerts = [newCert, ...serverCerts.filter((c) => c.id !== newCert.id)];

    return NextResponse.json({ success: true, certificate: newCert });
  } catch (err: any) {
    return NextResponse.json({ success: false, error: err.message }, { status: 500 });
  }
}

export async function DELETE(req: NextRequest) {
  const { searchParams } = new URL(req.url);
  const id = searchParams.get("id");

  if (!id) {
    return NextResponse.json({ success: false, error: "Certificate ID is required." }, { status: 400 });
  }

  serverCerts = serverCerts.filter((c) => c.id !== id);
  return NextResponse.json({ success: true, deletedId: id });
}
