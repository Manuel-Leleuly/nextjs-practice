import { BetterSqlite3Adapter } from "@lucia-auth/adapter-sqlite";
import { Lucia } from "lucia";
import { cookies } from "next/headers";
import { db } from "./db";

const adapter = new BetterSqlite3Adapter(db, {
  user: "users",
  session: "sessions",
});

const lucia = new Lucia(adapter, {
  sessionCookie: {
    expires: false,
    attributes: {
      secure: process.env.NODE_ENV === "production",
    },
  },
});

export class AuthLib {
  static createAuthSession = async (userId: number) => {
    const session = await lucia.createSession(userId.toString(), {});
    const sessionCookie = lucia.createSessionCookie(session.id);
    const requestCookies = await cookies();
    requestCookies.set(
      sessionCookie.name,
      sessionCookie.value,
      sessionCookie.attributes
    );
  };

  static verifyAuth = async () => {
    const requestCookies = await cookies();
    const sessionCookie = requestCookies.get(lucia.sessionCookieName);
    if (!sessionCookie) {
      return {
        user: null,
        session: null,
      };
    }

    const sessionId = sessionCookie.value;
    const result = await lucia.validateSession(sessionId);

    try {
      if (result.session && result.session.fresh) {
        const newSessionCookie = lucia.createSessionCookie(result.session.id);
        requestCookies.set(
          newSessionCookie.name,
          newSessionCookie.value,
          newSessionCookie.attributes
        );
      }

      if (!result.session) {
        const newSessionCookie = lucia.createBlankSessionCookie();
        requestCookies.set(
          newSessionCookie.name,
          newSessionCookie.value,
          newSessionCookie.attributes
        );
      }
    } catch (error) {
      // console.error(error);
    }

    return result;
  };

  static destroySession = async () => {
    const { session } = await this.verifyAuth();
    if (!session) {
      return {
        error: "Unauthorized",
      };
    }

    await lucia.invalidateSession(session.id);

    const requestCookies = await cookies();
    const newSessionCookie = lucia.createBlankSessionCookie();
    requestCookies.set(
      newSessionCookie.name,
      newSessionCookie.value,
      newSessionCookie.attributes
    );
  };
}
