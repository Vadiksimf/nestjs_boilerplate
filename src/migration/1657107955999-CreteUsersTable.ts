import { MigrationInterface, QueryRunner } from 'typeorm';

export class CreteUsersTable1657107955999 implements MigrationInterface {
  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(`CREATE TABLE "users" ("id" SERIAL NOT NULL, 
        "firstName" character varying, 
        "lastName" character varying, 
        "password" character varying NOT NULL, 
        "resetPasswordToken" character varying, 
        "resetPasswordExpires" character varying, 
        "email" character varying NOT NULL, 
        "avatarUrl" character varying NOT NULL, 
        "role" character varying NOT NULL)`);
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(`DROP TABLE "users"`);
  }
}
