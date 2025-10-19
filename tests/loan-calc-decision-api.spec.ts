import { APIResponse, expect, test } from '@playwright/test'
import { StatusCodes } from 'http-status-codes'
import { ApplicantDTO } from './applicant-dto'

const URL = 'https://backend.tallinn-learning.ee/api/loan-calc/decision'

test('decision: low risk', async ({ request }) => {
  const requestBody: ApplicantDTO = new ApplicantDTO(20000, 0, 30, true, 500, 12)
  const response: APIResponse = await request.post(URL, {
    data: requestBody,
  })
  expect.soft(response.status()).toBe(StatusCodes.OK)
  const responseBody = await response.json()
  expect.soft(responseBody.riskScore).toBe(2.0375)
  expect.soft(responseBody.riskLevel).toBe('Low Risk')
  expect.soft(responseBody.riskPeriods).toEqual([12, 18, 24, 30, 36])
  expect.soft(responseBody.applicationId.length).toBeGreaterThan(0)
  expect.soft(responseBody.riskDecision).toBe('positive')
})

test('decision: medium risk', async ({ request }) => {
  const requestBody: ApplicantDTO = new ApplicantDTO(20000, 0, 30, true, 500, 6)
  const response: APIResponse = await request.post(URL, {
    data: requestBody,
  })
  expect.soft(response.status()).toBe(StatusCodes.OK)
  const responseBody = await response.json()
  expect.soft(responseBody.riskScore).toBe(1.01875)
  expect.soft(responseBody.riskLevel).toBe('Medium Risk')
  expect.soft(responseBody.riskPeriods).toEqual([6, 9, 12])
  expect.soft(responseBody.applicationId.length).toBeGreaterThan(0)
  expect.soft(responseBody.riskDecision).toBe('positive')
})

test('decision: high risk', async ({ request }) => {
  const requestBody: ApplicantDTO = new ApplicantDTO(100, 0, 17, true, 1000, 12)
  const response: APIResponse = await request.post(URL, {
    data: requestBody,
  })
  expect.soft(response.status()).toBe(StatusCodes.OK)
  const responseBody = await response.json()
  expect.soft(responseBody.riskScore).toBe(17.2)
  expect.soft(responseBody.riskLevel).toBe('Very High Risk')
  expect.soft(responseBody.riskPeriods).toEqual([])
  expect.soft(responseBody.applicationId.length).toBeGreaterThan(0)
  expect.soft(responseBody.riskDecision).toBe('negative')
})
