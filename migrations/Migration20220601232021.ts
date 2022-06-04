import { Migration } from '@mikro-orm/migrations';

export class Migration20220601232021 extends Migration {

  async up(): Promise<void> {
    this.addSql('create table `tourist` (`id` int unsigned not null auto_increment primary key, `name` varchar(255) not null, `email` varchar(255) not null, `phone` varchar(255) not null, `password` varchar(255) not null, `created_at` datetime not null, `updated_at` datetime not null, `deleted_at` datetime not null) default character set utf8mb4 engine = InnoDB;');

    this.addSql('create table `provider` (`id` int unsigned not null auto_increment primary key, `name` varchar(255) not null, `phone` varchar(255) not null, `password` varchar(255) not null, `status` tinyint(1) not null default false, `created_at` datetime not null, `updated_at` datetime not null, `deleted_at` datetime null) default character set utf8mb4 engine = InnoDB;');

    this.addSql('create table `event` (`id` int unsigned not null auto_increment primary key, `title` varchar(255) not null, `description` varchar(255) not null, `provider_id` int unsigned not null, `address` varchar(255) not null, `photo` varchar(255) not null, `start_date` varchar(255) not null, `end_date` varchar(255) not null, `publish_date` varchar(255) not null, `end_publish_date` varchar(255) not null) default character set utf8mb4 engine = InnoDB;');
    this.addSql('alter table `event` add index `event_provider_id_index`(`provider_id`);');

    this.addSql('create table `tourists_event` (`id` int unsigned not null, `tourist_id` int unsigned not null, `event_id` int unsigned not null, `favourite` tinyint(1) not null, `scheduled` tinyint(1) not null, `opinion_id` int unsigned null, primary key (`id`, `tourist_id`, `event_id`)) default character set utf8mb4 engine = InnoDB;');
    this.addSql('alter table `tourists_event` add index `tourists_event_tourist_id_index`(`tourist_id`);');
    this.addSql('alter table `tourists_event` add index `tourists_event_event_id_index`(`event_id`);');

    this.addSql('create table `opinion` (`id` int unsigned not null auto_increment primary key, `opinion` varchar(255) not null, `tourist_event_id` int unsigned not null, `tourist_event_tourist_id` int unsigned not null, `tourist_event_event_id` int unsigned not null) default character set utf8mb4 engine = InnoDB;');
    this.addSql('alter table `opinion` add unique `opinion_tourist_event_id_tourist_event_tourist_id__681ec_unique`(`tourist_event_id`, `tourist_event_tourist_id`, `tourist_event_event_id`);');

    this.addSql('create table `category` (`id` int unsigned not null auto_increment primary key, `name` varchar(255) not null, `created_at` datetime not null, `updated_at` datetime not null, `deleted_at` datetime not null) default character set utf8mb4 engine = InnoDB;');

    this.addSql('create table `event_categories` (`event_id` int unsigned not null, `category_id` int unsigned not null, primary key (`event_id`, `category_id`)) default character set utf8mb4 engine = InnoDB;');
    this.addSql('alter table `event_categories` add index `event_categories_event_id_index`(`event_id`);');
    this.addSql('alter table `event_categories` add index `event_categories_category_id_index`(`category_id`);');

    this.addSql('create table `tourist_categories` (`tourist_id` int unsigned not null, `category_id` int unsigned not null, primary key (`tourist_id`, `category_id`)) default character set utf8mb4 engine = InnoDB;');
    this.addSql('alter table `tourist_categories` add index `tourist_categories_tourist_id_index`(`tourist_id`);');
    this.addSql('alter table `tourist_categories` add index `tourist_categories_category_id_index`(`category_id`);');

    this.addSql('create table `admin` (`id` int unsigned not null auto_increment primary key, `name` varchar(255) not null, `email` varchar(255) not null, `password` varchar(255) not null, `created_at` datetime not null, `updated_at` datetime not null, `deleted_at` datetime not null) default character set utf8mb4 engine = InnoDB;');

    this.addSql('alter table `event` add constraint `event_provider_id_foreign` foreign key (`provider_id`) references `provider` (`id`) on update cascade;');

    this.addSql('alter table `tourists_event` add constraint `tourists_event_tourist_id_foreign` foreign key (`tourist_id`) references `tourist` (`id`) on update cascade;');
    this.addSql('alter table `tourists_event` add constraint `tourists_event_event_id_foreign` foreign key (`event_id`) references `event` (`id`) on update cascade;');
    this.addSql('alter table `tourists_event` add constraint `tourists_event_opinion_id_foreign` foreign key (`opinion_id`) references `opinion` (`id`) on update cascade on delete set null;');

    this.addSql('alter table `opinion` add constraint `opinion_tourist_event_id_tourist_event_tourist_id_00d03_foreign` foreign key (`tourist_event_id`, `tourist_event_tourist_id`, `tourist_event_event_id`) references `tourists_event` (`id`, `tourist_id`, `event_id`) on update cascade;');

    this.addSql('alter table `event_categories` add constraint `event_categories_event_id_foreign` foreign key (`event_id`) references `event` (`id`) on update cascade on delete cascade;');
    this.addSql('alter table `event_categories` add constraint `event_categories_category_id_foreign` foreign key (`category_id`) references `category` (`id`) on update cascade on delete cascade;');

    this.addSql('alter table `tourist_categories` add constraint `tourist_categories_tourist_id_foreign` foreign key (`tourist_id`) references `tourist` (`id`) on update cascade on delete cascade;');
    this.addSql('alter table `tourist_categories` add constraint `tourist_categories_category_id_foreign` foreign key (`category_id`) references `category` (`id`) on update cascade on delete cascade;');
  }

}
