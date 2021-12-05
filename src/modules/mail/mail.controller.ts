import { Body, Controller, Post, UseGuards } from '@nestjs/common';
import { ApiOperation, ApiResponse, ApiTags } from '@nestjs/swagger';
import { MailService } from './mail.service';
import { JwtAuthGuard } from 'modules/auth/jwt-auth.guard';
import { EmailDto } from './mail.dto';

@ApiTags('Mail')
@Controller('mail')
export class MailController {
  constructor(private readonly mailService: MailService) {}

  @ApiOperation({ summary: 'Send mail for user with pass' })
  @ApiResponse({ status: 201 })
  @UseGuards(JwtAuthGuard)
  @Post()
  create(@Body() userDto: EmailDto) {
    return this.mailService.sendUserInformation(userDto);
  }
}
