import { Injectable, Logger } from '@nestjs/common';
import { Cron, CronExpression } from '@nestjs/schedule';
import { PrismaService } from 'src/prisma.service';
import { CreateArticleDto } from './dto/create-article.dto';
import { UpdateArticleDto } from './dto/update-article.dto';

@Injectable()
export class ArticlesService {
  constructor(private readonly prisma: PrismaService) {}

  create(createArticleDto: CreateArticleDto, userId: string) {
    return this.prisma.article.create({
      data: {
        ...createArticleDto,
        author: {
          connect: {
            id: userId,
          },
        },
      },
    });
  }

  findAll() {
    return this.prisma.article.findMany({
      where: {
        published: true,
      },
    });
  }

  findOne(id: string) {
    return this.prisma.article.findUnique({
      where: { id },
    });
  }

  update(id: string, updateArticleDto: UpdateArticleDto) {
    return this.prisma.article.update({
      where: { id },
      data: updateArticleDto,
    });
  }

  remove(id: string) {
    return this.prisma.article.delete({
      where: { id },
    });
  }

  @Cron(CronExpression.EVERY_10_SECONDS)
  publishArticles() {
    Logger.log('Publishing articles');
    return this.prisma.article.updateMany({
      where: {
        published: false,
        publicationDate: {
          lte: new Date(),
        },
      },
      data: {
        published: true,
      },
    });
  }
}
