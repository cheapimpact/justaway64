import { MigrationInterface, QueryRunner } from "typeorm";

export class MockData21626167007143 implements MigrationInterface {
  public async up(queryRunner: QueryRunner): Promise<void> {
    queryRunner.query(`
        insert into note (title, text, "creatorId", "createdAt") values ('Statistician I', 'Duis bibendum. Morbi non quam nec dui luctus rutrum. Nulla tellus.', 1, '2020-11-20T16:45:29Z');
insert into note (title, text, "creatorId", "createdAt") values ('Help Desk Operator', 'Proin eu mi. Nulla ac enim. In tempor, turpis nec euismod scelerisque, quam turpis adipiscing lorem, vitae mattis nibh ligula nec sem.', 1, '2021-04-06T17:57:27Z');
insert into note (title, text, "creatorId", "createdAt") values ('Account Executive', 'Curabitur at ipsum ac tellus semper interdum. Mauris ullamcorper purus sit amet nulla. Quisque arcu libero, rutrum ac, lobortis vel, dapibus at, diam.', 1, '2020-08-17T01:01:24Z');
insert into note (title, text, "creatorId", "createdAt") values ('Computer Systems Analyst IV', 'Curabitur at ipsum ac tellus semper interdum. Mauris ullamcorper purus sit amet nulla. Quisque arcu libero, rutrum ac, lobortis vel, dapibus at, diam.', 1, '2021-06-27T23:17:51Z');
insert into note (title, text, "creatorId", "createdAt") values ('Occupational Therapist', 'Phasellus in felis. Donec semper sapien a libero. Nam dui.', 1, '2020-07-21T22:09:55Z');
insert into note (title, text, "creatorId", "createdAt") values ('Senior Financial Analyst', 'Curabitur gravida nisi at nibh. In hac habitasse platea dictumst. Aliquam augue quam, sollicitudin vitae, consectetuer eget, rutrum at, lorem.', 1, '2020-09-15T18:58:44Z');
insert into note (title, text, "creatorId", "createdAt") values ('Human Resources Manager', 'Proin interdum mauris non ligula pellentesque ultrices. Phasellus id sapien in sapien iaculis congue. Vivamus metus arcu, adipiscing molestie, hendrerit at, vulputate vitae, nisl.', 1, '2020-09-19T15:08:36Z');
insert into note (title, text, "creatorId", "createdAt") values ('Help Desk Operator', 'Fusce posuere felis sed lacus. Morbi sem mauris, laoreet ut, rhoncus aliquet, pulvinar sed, nisl. Nunc rhoncus dui vel sem.', 1, '2020-10-23T11:34:19Z');
insert into note (title, text, "creatorId", "createdAt") values ('Senior Sales Associate', 'Maecenas tristique, est et tempus semper, est quam pharetra magna, ac consequat metus sapien ut nunc. Vestibulum ante ipsum primis in faucibus orci luctus et ultrices posuere cubilia Curae; Mauris viverra diam vitae quam. Suspendisse potenti.', 1, '2021-04-19T19:43:21Z');
insert into note (title, text, "creatorId", "createdAt") values ('Assistant Media Planner', 'Etiam vel augue. Vestibulum rutrum rutrum neque. Aenean auctor gravida sem.', 1, '2021-02-21T00:42:30Z');
insert into note (title, text, "creatorId", "createdAt") values ('Chemical Engineer', 'Curabitur in libero ut massa volutpat convallis. Morbi odio odio, elementum eu, interdum eu, tincidunt in, leo. Maecenas pulvinar lobortis est.', 1, '2020-08-19T14:39:54Z');
insert into note (title, text, "creatorId", "createdAt") values ('Marketing Assistant', 'Pellentesque at nulla. Suspendisse potenti. Cras in purus eu magna vulputate luctus.', 1, '2021-03-24T04:19:05Z');
insert into note (title, text, "creatorId", "createdAt") values ('Recruiting Manager', 'In quis justo. Maecenas rhoncus aliquam lacus. Morbi quis tortor id nulla ultrices aliquet.', 1, '2021-07-12T06:49:23Z');
insert into note (title, text, "creatorId", "createdAt") values ('Data Coordiator', 'Curabitur at ipsum ac tellus semper interdum. Mauris ullamcorper purus sit amet nulla. Quisque arcu libero, rutrum ac, lobortis vel, dapibus at, diam.', 1, '2020-10-17T19:01:28Z');
insert into note (title, text, "creatorId", "createdAt") values ('Sales Representative', 'Cras non velit nec nisi vulputate nonummy. Maecenas tincidunt lacus at velit. Vivamus vel nulla eget eros elementum pellentesque.', 1, '2020-07-27T10:10:59Z');
insert into note (title, text, "creatorId", "createdAt") values ('Teacher', 'Phasellus sit amet erat. Nulla tempus. Vivamus in felis eu sapien cursus vestibulum.', 1, '2020-07-15T14:18:34Z');
insert into note (title, text, "creatorId", "createdAt") values ('Account Representative III', 'Nulla ut erat id mauris vulputate elementum. Nullam varius. Nulla facilisi.', 1, '2020-10-15T23:41:28Z');
insert into note (title, text, "creatorId", "createdAt") values ('VP Accounting', 'Curabitur at ipsum ac tellus semper interdum. Mauris ullamcorper purus sit amet nulla. Quisque arcu libero, rutrum ac, lobortis vel, dapibus at, diam.', 1, '2020-09-29T01:25:26Z');
insert into note (title, text, "creatorId", "createdAt") values ('Web Designer I', 'Maecenas tristique, est et tempus semper, est quam pharetra magna, ac consequat metus sapien ut nunc. Vestibulum ante ipsum primis in faucibus orci luctus et ultrices posuere cubilia Curae; Mauris viverra diam vitae quam. Suspendisse potenti.', 1, '2020-11-04T01:07:30Z');
insert into note (title, text, "creatorId", "createdAt") values ('Structural Analysis Engineer', 'Aenean lectus. Pellentesque eget nunc. Donec quis orci eget orci vehicula condimentum.', 1, '2020-07-30T13:00:31Z');
insert into note (title, text, "creatorId", "createdAt") values ('Chemical Engineer', 'Praesent blandit. Nam nulla. Integer pede justo, lacinia eget, tincidunt eget, tempus vel, pede.', 1, '2021-05-14T23:13:14Z');
insert into note (title, text, "creatorId", "createdAt") values ('Electrical Engineer', 'Maecenas ut massa quis augue luctus tincidunt. Nulla mollis molestie lorem. Quisque ut erat.', 1, '2021-01-31T18:18:09Z');
insert into note (title, text, "creatorId", "createdAt") values ('Nuclear Power Engineer', 'Quisque id justo sit amet sapien dignissim vestibulum. Vestibulum ante ipsum primis in faucibus orci luctus et ultrices posuere cubilia Curae; Nulla dapibus dolor vel est. Donec odio justo, sollicitudin ut, suscipit a, feugiat et, eros.', 1, '2020-08-19T10:50:41Z');
insert into note (title, text, "creatorId", "createdAt") values ('Account Executive', 'Maecenas leo odio, condimentum id, luctus nec, molestie sed, justo. Pellentesque viverra pede ac diam. Cras pellentesque volutpat dui.', 1, '2020-09-28T14:35:12Z');
insert into note (title, text, "creatorId", "createdAt") values ('VP Accounting', 'Phasellus sit amet erat. Nulla tempus. Vivamus in felis eu sapien cursus vestibulum.', 1, '2020-10-13T23:14:37Z');
insert into note (title, text, "creatorId", "createdAt") values ('Internal Auditor', 'Proin interdum mauris non ligula pellentesque ultrices. Phasellus id sapien in sapien iaculis congue. Vivamus metus arcu, adipiscing molestie, hendrerit at, vulputate vitae, nisl.', 1, '2021-03-16T13:24:52Z');
insert into note (title, text, "creatorId", "createdAt") values ('Operator', 'Lorem ipsum dolor sit amet, consectetuer adipiscing elit. Proin risus. Praesent lectus.', 1, '2021-04-04T04:52:32Z');
insert into note (title, text, "creatorId", "createdAt") values ('Staff Scientist', 'Mauris enim leo, rhoncus sed, vestibulum sit amet, cursus id, turpis. Integer aliquet, massa id lobortis convallis, tortor risus dapibus augue, vel accumsan tellus nisi eu orci. Mauris lacinia sapien quis libero.', 1, '2021-04-09T09:53:13Z');
insert into note (title, text, "creatorId", "createdAt") values ('VP Accounting', 'Phasellus in felis. Donec semper sapien a libero. Nam dui.', 1, '2021-05-20T01:52:13Z');
insert into note (title, text, "creatorId", "createdAt") values ('Nurse Practicioner', 'Curabitur gravida nisi at nibh. In hac habitasse platea dictumst. Aliquam augue quam, sollicitudin vitae, consectetuer eget, rutrum at, lorem.', 1, '2021-04-01T15:23:57Z');
insert into note (title, text, "creatorId", "createdAt") values ('Geologist II', 'Mauris enim leo, rhoncus sed, vestibulum sit amet, cursus id, turpis. Integer aliquet, massa id lobortis convallis, tortor risus dapibus augue, vel accumsan tellus nisi eu orci. Mauris lacinia sapien quis libero.', 1, '2021-05-07T16:30:15Z');
insert into note (title, text, "creatorId", "createdAt") values ('Statistician II', 'Phasellus sit amet erat. Nulla tempus. Vivamus in felis eu sapien cursus vestibulum.', 1, '2021-04-14T13:28:39Z');
insert into note (title, text, "creatorId", "createdAt") values ('Geological Engineer', 'Nullam porttitor lacus at turpis. Donec posuere metus vitae ipsum. Aliquam non mauris.', 1, '2021-06-17T00:24:17Z');
insert into note (title, text, "creatorId", "createdAt") values ('VP Accounting', 'Curabitur gravida nisi at nibh. In hac habitasse platea dictumst. Aliquam augue quam, sollicitudin vitae, consectetuer eget, rutrum at, lorem.', 1, '2020-10-05T02:14:46Z');
insert into note (title, text, "creatorId", "createdAt") values ('Web Developer IV', 'Praesent id massa id nisl venenatis lacinia. Aenean sit amet justo. Morbi ut odio.', 1, '2021-01-11T11:44:04Z');
insert into note (title, text, "creatorId", "createdAt") values ('Systems Administrator III', 'Duis consequat dui nec nisi volutpat eleifend. Donec ut dolor. Morbi vel lectus in quam fringilla rhoncus.', 1, '2020-12-31T16:12:22Z');
insert into note (title, text, "creatorId", "createdAt") values ('Civil Engineer', 'Donec diam neque, vestibulum eget, vulputate ut, ultrices vel, augue. Vestibulum ante ipsum primis in faucibus orci luctus et ultrices posuere cubilia Curae; Donec pharetra, magna vestibulum aliquet ultrices, erat tortor sollicitudin mi, sit amet lobortis sapien sapien non mi. Integer ac neque.', 1, '2020-08-20T07:35:50Z');
insert into note (title, text, "creatorId", "createdAt") values ('Occupational Therapist', 'Curabitur gravida nisi at nibh. In hac habitasse platea dictumst. Aliquam augue quam, sollicitudin vitae, consectetuer eget, rutrum at, lorem.', 1, '2021-02-21T03:50:15Z');
insert into note (title, text, "creatorId", "createdAt") values ('Administrative Assistant II', 'Phasellus in felis. Donec semper sapien a libero. Nam dui.', 1, '2021-01-16T02:28:55Z');
insert into note (title, text, "creatorId", "createdAt") values ('Nurse Practicioner', 'Phasellus in felis. Donec semper sapien a libero. Nam dui.', 1, '2021-04-24T13:11:32Z');
insert into note (title, text, "creatorId", "createdAt") values ('Pharmacist', 'Maecenas tristique, est et tempus semper, est quam pharetra magna, ac consequat metus sapien ut nunc. Vestibulum ante ipsum primis in faucibus orci luctus et ultrices posuere cubilia Curae; Mauris viverra diam vitae quam. Suspendisse potenti.', 1, '2020-07-17T04:28:29Z');
insert into note (title, text, "creatorId", "createdAt") values ('Nuclear Power Engineer', 'Morbi porttitor lorem id ligula. Suspendisse ornare consequat lectus. In est risus, auctor sed, tristique in, tempus sit amet, sem.', 1, '2021-04-17T03:12:00Z');
insert into note (title, text, "creatorId", "createdAt") values ('Research Assistant I', 'Lorem ipsum dolor sit amet, consectetuer adipiscing elit. Proin risus. Praesent lectus.', 1, '2021-01-05T16:19:56Z');
insert into note (title, text, "creatorId", "createdAt") values ('Design Engineer', 'Morbi non lectus. Aliquam sit amet diam in magna bibendum imperdiet. Nullam orci pede, venenatis non, sodales sed, tincidunt eu, felis.', 1, '2020-09-15T04:29:28Z');
insert into note (title, text, "creatorId", "createdAt") values ('Staff Scientist', 'Nullam porttitor lacus at turpis. Donec posuere metus vitae ipsum. Aliquam non mauris.', 1, '2021-02-21T23:17:35Z');
insert into note (title, text, "creatorId", "createdAt") values ('Civil Engineer', 'Aenean lectus. Pellentesque eget nunc. Donec quis orci eget orci vehicula condimentum.', 1, '2021-01-09T07:07:32Z');
insert into note (title, text, "creatorId", "createdAt") values ('Assistant Professor', 'Integer ac leo. Pellentesque ultrices mattis odio. Donec vitae nisi.', 1, '2020-10-09T16:07:04Z');
insert into note (title, text, "creatorId", "createdAt") values ('Civil Engineer', 'In hac habitasse platea dictumst. Morbi vestibulum, velit id pretium iaculis, diam erat fermentum justo, nec condimentum neque sapien placerat ante. Nulla justo.', 1, '2020-08-02T16:50:18Z');
insert into note (title, text, "creatorId", "createdAt") values ('General Manager', 'Morbi non lectus. Aliquam sit amet diam in magna bibendum imperdiet. Nullam orci pede, venenatis non, sodales sed, tincidunt eu, felis.', 1, '2020-09-28T01:40:33Z');
insert into note (title, text, "creatorId", "createdAt") values ('Chief Design Engineer', 'Proin leo odio, porttitor id, consequat in, consequat ut, nulla. Sed accumsan felis. Ut at dolor quis odio consequat varius.', 1, '2020-09-05T03:24:07Z');
insert into note (title, text, "creatorId", "createdAt") values ('Teacher', 'Duis bibendum, felis sed interdum venenatis, turpis enim blandit mi, in porttitor pede justo eu massa. Donec dapibus. Duis at velit eu est congue elementum.', 1, '2021-02-13T12:54:36Z');
insert into note (title, text, "creatorId", "createdAt") values ('Computer Systems Analyst I', 'Mauris enim leo, rhoncus sed, vestibulum sit amet, cursus id, turpis. Integer aliquet, massa id lobortis convallis, tortor risus dapibus augue, vel accumsan tellus nisi eu orci. Mauris lacinia sapien quis libero.', 1, '2020-10-22T13:40:59Z');
insert into note (title, text, "creatorId", "createdAt") values ('Civil Engineer', 'Pellentesque at nulla. Suspendisse potenti. Cras in purus eu magna vulputate luctus.', 1, '2020-08-13T05:30:13Z');
insert into note (title, text, "creatorId", "createdAt") values ('Accountant II', 'Phasellus sit amet erat. Nulla tempus. Vivamus in felis eu sapien cursus vestibulum.', 1, '2021-05-04T22:49:44Z');
insert into note (title, text, "creatorId", "createdAt") values ('Technical Writer', 'Vestibulum quam sapien, varius ut, blandit non, interdum in, ante. Vestibulum ante ipsum primis in faucibus orci luctus et ultrices posuere cubilia Curae; Duis faucibus accumsan odio. Curabitur convallis.', 1, '2020-11-23T16:07:11Z');
insert into note (title, text, "creatorId", "createdAt") values ('Human Resources Assistant III', 'Integer ac leo. Pellentesque ultrices mattis odio. Donec vitae nisi.', 1, '2021-05-26T18:33:01Z');
insert into note (title, text, "creatorId", "createdAt") values ('Geological Engineer', 'Pellentesque at nulla. Suspendisse potenti. Cras in purus eu magna vulputate luctus.', 1, '2021-05-07T20:14:09Z');
insert into note (title, text, "creatorId", "createdAt") values ('Computer Systems Analyst III', 'Sed ante. Vivamus tortor. Duis mattis egestas metus.', 1, '2021-01-28T04:56:20Z');
insert into note (title, text, "creatorId", "createdAt") values ('Nuclear Power Engineer', 'Sed ante. Vivamus tortor. Duis mattis egestas metus.', 1, '2020-09-30T22:48:16Z');
insert into note (title, text, "creatorId", "createdAt") values ('Desktop Support Technician', 'Praesent blandit. Nam nulla. Integer pede justo, lacinia eget, tincidunt eget, tempus vel, pede.', 1, '2020-10-18T17:07:38Z');
insert into note (title, text, "creatorId", "createdAt") values ('Financial Advisor', 'Pellentesque at nulla. Suspendisse potenti. Cras in purus eu magna vulputate luctus.', 1, '2021-01-04T11:40:49Z');
insert into note (title, text, "creatorId", "createdAt") values ('Associate Professor', 'Duis bibendum, felis sed interdum venenatis, turpis enim blandit mi, in porttitor pede justo eu massa. Donec dapibus. Duis at velit eu est congue elementum.', 1, '2021-01-15T23:09:11Z');
insert into note (title, text, "creatorId", "createdAt") values ('Dental Hygienist', 'Cum sociis natoque penatibus et magnis dis parturient montes, nascetur ridiculus mus. Vivamus vestibulum sagittis sapien. Cum sociis natoque penatibus et magnis dis parturient montes, nascetur ridiculus mus.', 1, '2020-12-17T20:31:45Z');
insert into note (title, text, "creatorId", "createdAt") values ('Design Engineer', 'Aenean lectus. Pellentesque eget nunc. Donec quis orci eget orci vehicula condimentum.', 1, '2021-02-17T12:58:50Z');
insert into note (title, text, "creatorId", "createdAt") values ('Electrical Engineer', 'Morbi porttitor lorem id ligula. Suspendisse ornare consequat lectus. In est risus, auctor sed, tristique in, tempus sit amet, sem.', 1, '2021-04-01T05:51:20Z');
insert into note (title, text, "creatorId", "createdAt") values ('Account Executive', 'Sed sagittis. Nam congue, risus semper porta volutpat, quam pede lobortis ligula, sit amet eleifend pede libero quis orci. Nullam molestie nibh in lectus.', 1, '2021-04-27T22:49:16Z');
insert into note (title, text, "creatorId", "createdAt") values ('Accountant IV', 'Duis consequat dui nec nisi volutpat eleifend. Donec ut dolor. Morbi vel lectus in quam fringilla rhoncus.', 1, '2020-08-28T09:14:20Z');
insert into note (title, text, "creatorId", "createdAt") values ('Geological Engineer', 'Integer tincidunt ante vel ipsum. Praesent blandit lacinia erat. Vestibulum sed magna at nunc commodo placerat.', 1, '2020-09-06T09:45:29Z');
insert into note (title, text, "creatorId", "createdAt") values ('Budget/Accounting Analyst IV', 'Proin interdum mauris non ligula pellentesque ultrices. Phasellus id sapien in sapien iaculis congue. Vivamus metus arcu, adipiscing molestie, hendrerit at, vulputate vitae, nisl.', 1, '2021-05-14T20:47:38Z');
insert into note (title, text, "creatorId", "createdAt") values ('Financial Advisor', 'Praesent id massa id nisl venenatis lacinia. Aenean sit amet justo. Morbi ut odio.', 1, '2021-01-25T12:36:34Z');
insert into note (title, text, "creatorId", "createdAt") values ('Research Associate', 'In congue. Etiam justo. Etiam pretium iaculis justo.', 1, '2020-08-07T09:35:59Z');
insert into note (title, text, "creatorId", "createdAt") values ('Librarian', 'Mauris enim leo, rhoncus sed, vestibulum sit amet, cursus id, turpis. Integer aliquet, massa id lobortis convallis, tortor risus dapibus augue, vel accumsan tellus nisi eu orci. Mauris lacinia sapien quis libero.', 1, '2021-07-04T02:37:38Z');
insert into note (title, text, "creatorId", "createdAt") values ('Compensation Analyst', 'Cras mi pede, malesuada in, imperdiet et, commodo vulputate, justo. In blandit ultrices enim. Lorem ipsum dolor sit amet, consectetuer adipiscing elit.', 1, '2020-11-21T03:45:24Z');
insert into note (title, text, "creatorId", "createdAt") values ('VP Sales', 'Quisque porta volutpat erat. Quisque erat eros, viverra eget, congue eget, semper rutrum, nulla. Nunc purus.', 1, '2020-10-27T06:01:22Z');
insert into note (title, text, "creatorId", "createdAt") values ('Internal Auditor', 'Proin interdum mauris non ligula pellentesque ultrices. Phasellus id sapien in sapien iaculis congue. Vivamus metus arcu, adipiscing molestie, hendrerit at, vulputate vitae, nisl.', 1, '2021-05-27T03:51:09Z');
insert into note (title, text, "creatorId", "createdAt") values ('Nurse', 'Curabitur in libero ut massa volutpat convallis. Morbi odio odio, elementum eu, interdum eu, tincidunt in, leo. Maecenas pulvinar lobortis est.', 1, '2020-09-04T03:36:07Z');
insert into note (title, text, "creatorId", "createdAt") values ('Structural Engineer', 'Sed sagittis. Nam congue, risus semper porta volutpat, quam pede lobortis ligula, sit amet eleifend pede libero quis orci. Nullam molestie nibh in lectus.', 1, '2020-11-05T05:28:39Z');
insert into note (title, text, "creatorId", "createdAt") values ('Senior Cost Accountant', 'Duis consequat dui nec nisi volutpat eleifend. Donec ut dolor. Morbi vel lectus in quam fringilla rhoncus.', 1, '2021-05-28T19:53:33Z');
insert into note (title, text, "creatorId", "createdAt") values ('Account Coordinator', 'Maecenas leo odio, condimentum id, luctus nec, molestie sed, justo. Pellentesque viverra pede ac diam. Cras pellentesque volutpat dui.', 1, '2021-02-27T08:38:56Z');
insert into note (title, text, "creatorId", "createdAt") values ('Associate Professor', 'Cum sociis natoque penatibus et magnis dis parturient montes, nascetur ridiculus mus. Vivamus vestibulum sagittis sapien. Cum sociis natoque penatibus et magnis dis parturient montes, nascetur ridiculus mus.', 1, '2021-04-22T23:07:05Z');
insert into note (title, text, "creatorId", "createdAt") values ('Registered Nurse', 'Donec diam neque, vestibulum eget, vulputate ut, ultrices vel, augue. Vestibulum ante ipsum primis in faucibus orci luctus et ultrices posuere cubilia Curae; Donec pharetra, magna vestibulum aliquet ultrices, erat tortor sollicitudin mi, sit amet lobortis sapien sapien non mi. Integer ac neque.', 1, '2020-09-02T13:42:07Z');
insert into note (title, text, "creatorId", "createdAt") values ('Statistician I', 'Proin interdum mauris non ligula pellentesque ultrices. Phasellus id sapien in sapien iaculis congue. Vivamus metus arcu, adipiscing molestie, hendrerit at, vulputate vitae, nisl.', 1, '2021-05-19T13:33:45Z');
insert into note (title, text, "creatorId", "createdAt") values ('Assistant Manager', 'Aenean fermentum. Donec ut mauris eget massa tempor convallis. Nulla neque libero, convallis eget, eleifend luctus, ultricies eu, nibh.', 1, '2021-05-03T06:57:50Z');
insert into note (title, text, "creatorId", "createdAt") values ('Assistant Media Planner', 'Sed ante. Vivamus tortor. Duis mattis egestas metus.', 1, '2020-10-15T18:37:27Z');
insert into note (title, text, "creatorId", "createdAt") values ('Programmer Analyst I', 'Maecenas tristique, est et tempus semper, est quam pharetra magna, ac consequat metus sapien ut nunc. Vestibulum ante ipsum primis in faucibus orci luctus et ultrices posuere cubilia Curae; Mauris viverra diam vitae quam. Suspendisse potenti.', 1, '2021-03-08T01:24:24Z');
insert into note (title, text, "creatorId", "createdAt") values ('VP Marketing', 'Proin leo odio, porttitor id, consequat in, consequat ut, nulla. Sed accumsan felis. Ut at dolor quis odio consequat varius.', 1, '2021-01-07T22:16:17Z');
insert into note (title, text, "creatorId", "createdAt") values ('Computer Systems Analyst III', 'Etiam vel augue. Vestibulum rutrum rutrum neque. Aenean auctor gravida sem.', 1, '2021-01-22T10:11:14Z');
insert into note (title, text, "creatorId", "createdAt") values ('Executive Secretary', 'Duis bibendum. Morbi non quam nec dui luctus rutrum. Nulla tellus.', 1, '2021-04-19T19:04:38Z');
insert into note (title, text, "creatorId", "createdAt") values ('Tax Accountant', 'Sed sagittis. Nam congue, risus semper porta volutpat, quam pede lobortis ligula, sit amet eleifend pede libero quis orci. Nullam molestie nibh in lectus.', 1, '2020-09-06T16:47:59Z');
insert into note (title, text, "creatorId", "createdAt") values ('Teacher', 'In sagittis dui vel nisl. Duis ac nibh. Fusce lacus purus, aliquet at, feugiat non, pretium quis, lectus.', 1, '2021-04-03T04:26:31Z');
insert into note (title, text, "creatorId", "createdAt") values ('Human Resources Assistant III', 'Sed ante. Vivamus tortor. Duis mattis egestas metus.', 1, '2020-08-17T18:39:22Z');
insert into note (title, text, "creatorId", "createdAt") values ('Registered Nurse', 'Proin eu mi. Nulla ac enim. In tempor, turpis nec euismod scelerisque, quam turpis adipiscing lorem, vitae mattis nibh ligula nec sem.', 1, '2021-03-24T22:24:24Z');
insert into note (title, text, "creatorId", "createdAt") values ('Quality Control Specialist', 'Duis aliquam convallis nunc. Proin at turpis a pede posuere nonummy. Integer non velit.', 1, '2021-05-31T18:04:57Z');
insert into note (title, text, "creatorId", "createdAt") values ('Health Coach III', 'Aliquam quis turpis eget elit sodales scelerisque. Mauris sit amet eros. Suspendisse accumsan tortor quis turpis.', 1, '2020-08-18T19:11:19Z');
insert into note (title, text, "creatorId", "createdAt") values ('Environmental Tech', 'Maecenas tristique, est et tempus semper, est quam pharetra magna, ac consequat metus sapien ut nunc. Vestibulum ante ipsum primis in faucibus orci luctus et ultrices posuere cubilia Curae; Mauris viverra diam vitae quam. Suspendisse potenti.', 1, '2020-12-16T17:46:01Z');
insert into note (title, text, "creatorId", "createdAt") values ('Human Resources Assistant II', 'Duis aliquam convallis nunc. Proin at turpis a pede posuere nonummy. Integer non velit.', 1, '2021-05-22T17:07:57Z');
insert into note (title, text, "creatorId", "createdAt") values ('Web Developer III', 'Mauris enim leo, rhoncus sed, vestibulum sit amet, cursus id, turpis. Integer aliquet, massa id lobortis convallis, tortor risus dapibus augue, vel accumsan tellus nisi eu orci. Mauris lacinia sapien quis libero.', 1, '2021-06-14T15:05:26Z');
insert into note (title, text, "creatorId", "createdAt") values ('Project Manager', 'Vestibulum ac est lacinia nisi venenatis tristique. Fusce congue, diam id ornare imperdiet, sapien urna pretium nisl, ut volutpat sapien arcu sed augue. Aliquam erat volutpat.', 1, '2021-06-22T01:49:05Z');
insert into note (title, text, "creatorId", "createdAt") values ('Occupational Therapist', 'Fusce posuere felis sed lacus. Morbi sem mauris, laoreet ut, rhoncus aliquet, pulvinar sed, nisl. Nunc rhoncus dui vel sem.', 1, '2020-10-19T22:48:10Z');
insert into note (title, text, "creatorId", "createdAt") values ('VP Quality Control', 'Sed sagittis. Nam congue, risus semper porta volutpat, quam pede lobortis ligula, sit amet eleifend pede libero quis orci. Nullam molestie nibh in lectus.', 1, '2020-07-26T07:43:07Z');

        `);
  }

  public async down(queryRunner: QueryRunner): Promise<void> {}
}