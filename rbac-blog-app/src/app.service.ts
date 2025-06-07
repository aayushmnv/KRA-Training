import { Injectable, OnModuleInit } from '@nestjs/common';
// import { InjectRepository } from '@nestjs/typeorm';
// import { Role } from './roles/role.entity/role.entity';
// import { Repository } from 'typeorm';
// import { Permission } from './permissions/permission.entity/permission.entity';
// import { PERMISSIONS, ROLE_PERMISSIONS } from './permissions/permissions.seed';

@Injectable()
export class AppService
//  implements OnModuleInit
   {
  constructor(
  //   @InjectRepository(Role) 
  //   private readonly roleRepo : Repository<Role>,

  //   @InjectRepository(Permission)
  //   private readonly permRepo : Repository<Permission>,
  ){}

  // async onModuleInit() {
  //   await this.seedRolesAndPermissions()
  // }
  //  async seedRolesAndPermissions() {
  //   for (const permName of PERMISSIONS) {
  //     const exists = await this.permRepo.findOne({ where: { name: permName } });
  //     if (!exists) {
  //       await this.permRepo.save({ name: permName });
  //     }
  //   }
  

  // for (const [roleName, permList] of Object.entries(ROLE_PERMISSIONS)) {
  //     let role = await this.roleRepo.findOne({ where: { name: roleName }, relations: ['permissions'] });
  //     if (!role) {
  //       role = this.roleRepo.create({ name: roleName });
  //     }

  //     const perms = await this.permRepo.find({
  //       where: permList.map((name) => ({ name })),
  //     });

  //     role.permissions = perms;
  //     await this.roleRepo.save(role);
  //   }

  //   console.log('✅ Roles and Permissions Seeded');
  // }
}
