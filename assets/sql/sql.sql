#------------------------------------------------------------
#--- Change database
#------------------------------------------------------------
USE musculator;

#------------------------------------------------------------
#--- Database cleanup
#------------------------------------------------------------
DROP TABLE IF EXISTS seance;
DROP TABLE IF EXISTS exercice;
DROP TABLE IF EXISTS programme;
DROP TABLE IF EXISTS user;

#------------------------------------------------------------
#--- Database creation
#------------------------------------------------------------
CREATE TABLE user(
        login    Varchar (255) NOT NULL ,
        password Varchar (255) NOT NULL ,
        token    Varchar (20)
	,CONSTRAINT user_PK PRIMARY KEY (login)
)ENGINE=InnoDB;

CREATE TABLE program(
        id    Int  Auto_increment  NOT NULL ,
        name  Varchar (255) NOT NULL ,
        login Varchar (255) NOT NULL
	,CONSTRAINT program_PK PRIMARY KEY (id)

	,CONSTRAINT program_user_FK FOREIGN KEY (login) REFERENCES user(login)
)ENGINE=InnoDB;

CREATE TABLE exercise(
        id          Int  Auto_increment  NOT NULL ,
        name        Varchar (255) NOT NULL ,
        serie       Int NOT NULL ,
        repetition  Int NOT NULL ,
        description Text ,
        id_program  Int NOT NULL ,
        login       Varchar (255) NOT NULL
	,CONSTRAINT exercise_PK PRIMARY KEY (id)

	,CONSTRAINT exercise_program_FK FOREIGN KEY (id_program) REFERENCES program(id)
	,CONSTRAINT exercise_user0_FK FOREIGN KEY (login) REFERENCES user(login)
)ENGINE=InnoDB;

CREATE TABLE session(
        id          Int  Auto_increment  NOT NULL ,
        repetition  Int NOT NULL ,
        serie       Int NOT NULL ,
        date        Date NOT NULL ,
        id_exercise Int NOT NULL ,
        login       Varchar (255) NOT NULL
	,CONSTRAINT session_PK PRIMARY KEY (id)

	,CONSTRAINT session_exercise_FK FOREIGN KEY (id_exercise) REFERENCES exercise(id)
	,CONSTRAINT session_user0_FK FOREIGN KEY (login) REFERENCES user(login)
)ENGINE=InnoDB;


set names utf8;