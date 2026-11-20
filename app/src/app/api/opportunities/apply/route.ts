import { NextRequest, NextResponse } from "next/server";
import { INITIAL_APPLICATIONS } from "../../../../lib/dataStore";
import { OpportunityApplication } from "../../../../types";

let serverApplications: OpportunityApplication[] = [...INITIAL_APPLICATIONS];

export async function GET(req: NextRequest) {
  const { searchParams } = new URL(req.url);
  const orgUsername = searchParams.get("orgUsername");

  if (orgUsername) {
    const orgApps = serverApplications.filter((a) => a.orgUsername === orgUsername);
    return NextResponse.json({ success: true, applications: orgApps });
  }

  return NextResponse.json({ success: true, applications: serverApplications });
}

export async function POST(req: NextRequest) {
  try {
    const app: OpportunityApplication = await req.json();

    if (!app.opportunityId || !app.developerUsername) {
      return NextResponse.json(
        { success: false, error: "Opportunity ID and Developer identity are required." },
        { status: 400 }
      );
    }

    const newApp: OpportunityApplication = {
      ...app,
      id: app.id || `app-${Date.now()}`,
      submittedAt: new Date().toISOString().replace("T", " ").slice(0, 16),
      status: "Pending",
    };

    serverApplications = [newApp, ...serverApplications];
    return NextResponse.json({ success: true, application: newApp });
  } catch (err: any) {
    return NextResponse.json({ success: false, error: err.message }, { status: 500 });
  }
}
