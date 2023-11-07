import { db } from "./db";

export async function getOrCreateConversations(
  memberOneId: string,
  memberTwoId: string
) {
  try {
    let conversation =
      (await findConversations(memberOneId, memberTwoId)) ||
      (await findConversations(memberTwoId, memberOneId));

    if (!conversation) {
      conversation = await createConversations(memberOneId, memberTwoId);
    }

    return conversation;
  } catch {
    return null;
  }
}

async function findConversations(memberOneId: string, memberTwoId: string) {
  try {
    return await db.conversation.findFirst({
      where: {
        AND: [
          {
            memberOneId,
            memberTwoId,
          },
        ],
      },
      include: {
        memberOne: {
          include: {
            profile: true,
          },
        },
        memberTwo: {
          include: {
            profile: true,
          },
        },
      },
    });
  } catch {
    return null;
  }
}

async function createConversations(memberOneId: string, memberTwoId: string) {
  try {
    return await db.conversation.create({
      data: {
        memberOneId,
        memberTwoId,
      },
      include: {
        memberOne: {
          include: {
            profile: true,
          },
        },
        memberTwo: {
          include: {
            profile: true,
          },
        },
      },
    });
  } catch {
    return null;
  }
}
