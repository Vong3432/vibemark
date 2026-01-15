import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Bookmark } from './entities/bookmark.entity';
import { CreateBookmarkDto } from './dto/create-bookmark.dto';
import { UpdateBookmarkDto } from './dto/update-bookmark.dto';

@Injectable()
export class BookmarksService {
  constructor(
    @InjectRepository(Bookmark)
    private readonly bookmarkRepository: Repository<Bookmark>,
  ) {}

  async create(
    userId: string,
    createBookmarkDto: CreateBookmarkDto,
  ): Promise<Bookmark> {
    const bookmark = this.bookmarkRepository.create({
      ...createBookmarkDto,
      userId,
    });
    return this.bookmarkRepository.save(bookmark);
  }

  async findAll(userId: string): Promise<Bookmark[]> {
    return this.bookmarkRepository.find({
      where: { userId },
      order: { createdAt: 'DESC' },
    });
  }

  async findOne(id: string, userId: string): Promise<Bookmark> {
    const bookmark = await this.bookmarkRepository.findOne({
      where: { id, userId },
    });
    if (!bookmark) {
      throw new NotFoundException(`Bookmark with ID "${id}" not found`);
    }
    return bookmark;
  }

  async update(
    id: string,
    userId: string,
    updateBookmarkDto: UpdateBookmarkDto,
  ): Promise<Bookmark> {
    const bookmark = await this.findOne(id, userId);
    Object.assign(bookmark, updateBookmarkDto);
    return this.bookmarkRepository.save(bookmark);
  }

  async remove(id: string, userId: string): Promise<void> {
    const bookmark = await this.findOne(id, userId);
    await this.bookmarkRepository.remove(bookmark);
  }
}
