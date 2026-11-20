import { NextRequest, NextResponse } from "next/server";
import { INITIAL_OPPORTUNITIES } from "../../../lib/dataStore";
import { HiringOpportunity } from "../../../types";

let serverOpportunities: HiringOpportunity[] = [...INITIAL_OPPORTUNITIES];

export async function GET() {
  return NextResponse.json({ success: true, opportunities: serverOpportunities });
}

export async function POST(req: NextRequest) {
  try {
    const opp: HiringOpportunity = await req.json();

    if (!opp.title || !opp.description || !opp.compensation) {
      return NextResponse.json(
        { success: false, error: "Title, description, and compensation details are required." },
        { status: 400 }
      );
    }

    const newOpp: HiringOpportunity = {
      ...opp,
      id: opp.id || `opp-${Date.now()}`,
      createdAt: new Date().toISOString().split("T")[0],
      status: "Open",
      applicantsCount: 0,
    };

    serverOpportunities = [newOpp, ...serverOpportunities];
    return NextResponse.json({ success: true, opportunity: newOpp });
  } catch (err: any) {
    return NextResponse.json({ success: false, error: err.message }, { status: 500 });
  }
}

export async function PUT(req: NextRequest) {
  try {
    const body = await req.json();
    const { id, status } = body;

    serverOpportunities = serverOpportunities.map((o) =>
      o.id === id ? { ...o, status } : o
    );

    return NextResponse.json({ success: true });
  } catch (err: any) {
    return NextResponse.json({ success: false, error: err.message }, { status: 500 });
  }
}
