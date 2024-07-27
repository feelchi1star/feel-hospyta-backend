import {
  Controller,
  Param,
  Delete,
  Req,
  UseGuards,
  UsePipes,
  ValidationPipe,
} from '@nestjs/common';
import { VotesService } from './votes.service';
import { Request } from 'express';
import { AuthGuard } from 'src/auths/auths.guard';

@Controller('votes')
@UsePipes(
  new ValidationPipe({
    transform: true,
    whitelist: true,
  }),
)
export class VotesController {
  constructor(private readonly votesService: VotesService) {}

  @UseGuards(AuthGuard)
  @Delete(':id')
  async remove(@Param('id') id: string, @Req() req: Request) {
    const userId = req['user']._id; // Get the user ID from the request
    return await this.votesService.remove(id, userId);
  }
}
