# Mermaid Test

´´´mermaid
  graph TD;
    Start[Start] --> connectDB;
    connectDB -->|Success| checkUserEmail;
    checkUserEmail -->|User exists| insertIntoUserAccountRel;
    checkUserEmail -->|User does not exist| createUserAndInsert;
    insertIntoUserAccountRel --> endProcess;
    createUserAndInsert --> endProcess;
    endProcess[End];

    subgraph Async_Function
      connectDB((Connect to DB))
      checkUserEmail{Check User Email};
      insertIntoUserAccountRel{Insert into User Account Relationship};
      createUserAndInsert{Create User and Insert}
    end
´´´