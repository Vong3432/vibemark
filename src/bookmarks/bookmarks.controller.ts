import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  UseGuards,
  ParseUUIDPipe,
  HttpStatus,
} from '@nestjs/common';
import {
  ApiTags,
  ApiOperation,
  ApiResponse,
  ApiSecurity,
  ApiParam,
  ApiBadRequestResponse,
  ApiNotFoundResponse,
  ApiUnauthorizedResponse,
} from '@nestjs/swagger';
import { BookmarksService } from './bookmarks.service';
import { CreateBookmarkDto } from './dto/create-bookmark.dto';
import { UpdateBookmarkDto } from './dto/update-bookmark.dto';
import { UserGuard } from '../common/guards/user.guard';
import { UserId } from '../common/decorators/user-id.decorator';
import { Bookmark } from './entities/bookmark.entity';

@ApiTags('bookmarks')
@ApiSecurity('x-user-id')
@ApiUnauthorizedResponse({
  description: 'Missing or invalid x-user-id header',
})
@Controller('bookmarks')
@UseGuards(UserGuard)
export class BookmarksController {
  constructor(private readonly bookmarksService: BookmarksService) {}

  @Post()
  @ApiOperation({
    summary: 'Create a new bookmark',
    description:
      'Creates a new bookmark for the authenticated user. Requires a valid URL from social platforms.',
  })
  @ApiResponse({
    status: HttpStatus.CREATED,
    description: 'Bookmark successfully created',
    type: Bookmark,
  })
  @ApiBadRequestResponse({
    description: 'Invalid input data (e.g., malformed URL)',
  })
  create(
    @UserId() userId: string,
    @Body() createBookmarkDto: CreateBookmarkDto,
  ) {
    return this.bookmarksService.create(userId, createBookmarkDto);
  }

  @Get()
  @ApiOperation({
    summary: 'Get all bookmarks',
    description:
      'Retrieves all bookmarks for the authenticated user. Returns an empty array if no bookmarks exist.',
  })
  @ApiResponse({
    status: HttpStatus.OK,
    description: 'List of user bookmarks retrieved successfully',
    type: [Bookmark],
  })
  findAll(@UserId() userId: string) {
    return this.bookmarksService.findAll(userId);
  }

  @Get(':id')
  @ApiOperation({
    summary: 'Get a bookmark by ID',
    description:
      'Retrieves a specific bookmark by its ID. The bookmark must belong to the authenticated user.',
  })
  @ApiParam({
    name: 'id',
    description: 'UUID of the bookmark',
    example: '550e8400-e29b-41d4-a716-446655440000',
    type: 'string',
    format: 'uuid',
  })
  @ApiResponse({
    status: HttpStatus.OK,
    description: 'Bookmark found and retrieved successfully',
    type: Bookmark,
  })
  @ApiNotFoundResponse({
    description: 'Bookmark not found or does not belong to the user',
  })
  @ApiBadRequestResponse({
    description: 'Invalid UUID format',
  })
  findOne(@Param('id', ParseUUIDPipe) id: string, @UserId() userId: string) {
    return this.bookmarksService.findOne(id, userId);
  }

  @Patch(':id')
  @ApiOperation({
    summary: 'Update a bookmark',
    description:
      'Updates an existing bookmark. Only the URL can be updated. The bookmark must belong to the authenticated user.',
  })
  @ApiParam({
    name: 'id',
    description: 'UUID of the bookmark to update',
    example: '550e8400-e29b-41d4-a716-446655440000',
    type: 'string',
    format: 'uuid',
  })
  @ApiResponse({
    status: HttpStatus.OK,
    description: 'Bookmark successfully updated',
    type: Bookmark,
  })
  @ApiNotFoundResponse({
    description: 'Bookmark not found or does not belong to the user',
  })
  @ApiBadRequestResponse({
    description: 'Invalid UUID format or invalid URL',
  })
  update(
    @Param('id', ParseUUIDPipe) id: string,
    @UserId() userId: string,
    @Body() updateBookmarkDto: UpdateBookmarkDto,
  ) {
    return this.bookmarksService.update(id, userId, updateBookmarkDto);
  }

  @Delete(':id')
  @ApiOperation({
    summary: 'Delete a bookmark',
    description:
      'Permanently deletes a bookmark. The bookmark must belong to the authenticated user.',
  })
  @ApiParam({
    name: 'id',
    description: 'UUID of the bookmark to delete',
    example: '550e8400-e29b-41d4-a716-446655440000',
    type: 'string',
    format: 'uuid',
  })
  @ApiResponse({
    status: HttpStatus.OK,
    description: 'Bookmark successfully deleted',
  })
  @ApiNotFoundResponse({
    description: 'Bookmark not found or does not belong to the user',
  })
  @ApiBadRequestResponse({
    description: 'Invalid UUID format',
  })
  remove(@Param('id', ParseUUIDPipe) id: string, @UserId() userId: string) {
    return this.bookmarksService.remove(id, userId);
  }
}
