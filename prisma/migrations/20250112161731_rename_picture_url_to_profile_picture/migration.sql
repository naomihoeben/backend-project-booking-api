-- Wijzig de kolomnaam van `pictureUrl` naar `profilePicture` in de `Host` tabel
ALTER TABLE "Host" RENAME COLUMN "pictureUrl" TO "profilePicture";

-- Wijzig de kolomnaam van `pictureUrl` naar `profilePicture` in de `User` tabel
ALTER TABLE "User" RENAME COLUMN "pictureUrl" TO "profilePicture";
