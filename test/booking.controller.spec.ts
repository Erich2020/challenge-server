// tests/booking.controller.spec.ts
import request from 'supertest';
import mongoose from 'mongoose';
import { app } from '../src/app';
import { User } from '../src/models/User';
import { Occurrence } from '../src/models/Occurrence';
import { Booking } from '../src/models/Booking';
import { userSeed, occurrenceSeed } from '../src/config/seed';
import config from '../src/config';

describe('BookingController - create', () => {
  beforeAll(async () => {
    await mongoose.connect(config.mongoURI);
    await User.deleteMany({});
    await Occurrence.deleteMany({});
    await Booking.deleteMany({});
    await User.create(userSeed);
    await Occurrence.create(occurrenceSeed);
  });

  afterAll(async () => {
    await mongoose.disconnect();
  });

  it('❌ No debe permitir crear reserva si la capacidad ya está llena', async () => {
    // Crear reservas hasta llenar la capacidad
    await Occurrence.updateOne(
      {
        id: occurrenceSeed.id,
      },
      {
        capacity: 0,
      },
    );
    const resAuth = await request(app).post('/api/login').send({
      email: 'test@test.com',
      password: 'Asd1234#',
    });
    const res = await request(app)
      .post('/api/booking')
      .set('Authorization', `Bearer ${resAuth.body}`)
      .send({
        occurrence: occurrenceSeed._id.toString(),
      });
    expect(res.statusCode).toBe(400);
    expect(res.body.error).toMatch(/BOOKING_NOT_AVAILABLE/);
  });

  it('❌ No debe permitir reservas duplicadas para el mismo usuario', async () => {
    // Crear primera reserva
    await Occurrence.updateOne(
      {
        id: occurrenceSeed.id,
      },
      {
        capacity: 1,
      },
    );

    await Booking.create({
      user: userSeed._id,
      occurrence: occurrenceSeed._id,
      isActive: true,
      isExec: true,
    });
    const resAuth = await request(app).post('/api/login').send({
      email: 'test@test.com',
      password: 'Asd1234#',
    });

    const res = await request(app)
      .post('/api/booking')
      .set('Authorization', `Bearer ${resAuth.body}`)
      .send({
        occurrence: occurrenceSeed._id.toString(),
      });

    expect(res.statusCode).toBe(400);
    expect(res.body.error).toMatch(/BOOKING_EXISTS/);
  });
});
