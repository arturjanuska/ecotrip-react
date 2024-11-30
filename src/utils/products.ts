/* eslint-disable no-mixed-spaces-and-tabs */
/* eslint-disable @typescript-eslint/ban-ts-comment */
import { CommonProductTypeExample, OptionType } from './types';
import {  getOptions } from './getOptions';
import { convertRangeSizeToOptionType } from './convertSizeOptions';

export const automotiveGoodsCategoryProducts: CommonProductTypeExample[] = [
	// setOfWheels
	{
		category: {
			label: 'automotiveGoods',
			value: 'automotiveGoods',
		},
		productType: {
			label: 'setOfWheels',
			value: 'setOfWheels',
		},
		size: {
			from: 0,
			to: 15,
		},
		volume: 0.08,
		weight: 28,
		specification: {
			label: 'withoutTires',
			value: 'withoutTires',
		},
		price: 60,
	},
	{
		category: {
			label: 'automotiveGoods',
			value: 'automotiveGoods',
		},
		productType: {
			label: 'setOfWheels',
			value: 'setOfWheels',
		},
		size: {
			from: 0,
			to: 15,
		},
		volume: 0.24,
		weight: 40,
		specification: {
			label: 'withTires',
			value: 'withTires',
		},
		price: 70,
	},
	{
		category: {
			label: 'automotiveGoods',
			value: 'automotiveGoods',
		},
		productType: {
			label: 'setOfWheels',
			value: 'setOfWheels',
		},
		size: {
			from: 16,
			to: 17,
		},
		volume: 0.1,
		weight: 32,
		specification: {
			label: 'withoutTires',
			value: 'withoutTires',
		},
		price: 80,
	},
	{
		category: {
			label: 'automotiveGoods',
			value: 'automotiveGoods',
		},
		productType: {
			label: 'setOfWheels',
			value: 'setOfWheels',
		},
		size: {
			from: 16,
			to: 17,
		},
		volume: 0.3,
		weight: 48,
		specification: {
			label: 'withTires',
			value: 'withTires',
		},
		price: 90,
	},
	{
		category: {
			label: 'automotiveGoods',
			value: 'automotiveGoods',
		},
		productType: {
			label: 'setOfWheels',
			value: 'setOfWheels',
		},
		size: {
			from: 18,
			to: 21,
		},
		volume: 0.12,
		weight: 40,
		specification: {
			label: 'withoutTires',
			value: 'withoutTires',
		},
		price: 100,
	},
	{
		category: {
			label: 'automotiveGoods',
			value: 'automotiveGoods',
		},
		productType: {
			label: 'setOfWheels',
			value: 'setOfWheels',
		},
		size: {
			from: 18,
			to: 21,
		},
		volume: 0.36,
		weight: 60,
		specification: {
			label: 'withTires',
			value: 'withTires',
		},
		price: 110,
	},
	{
		category: {
			label: 'automotiveGoods',
			value: 'automotiveGoods',
		},
		productType: {
			label: 'setOfWheels',
			value: 'setOfWheels',
		},
		size: {
			from: 22,
			to: Infinity,
		},
		volume: 0.14,
		weight: 48,
		specification: {
			label: 'withoutTires',
			value: 'withoutTires',
		},
		price: 120,
	},
	{
		category: {
			label: 'automotiveGoods',
			value: 'automotiveGoods',
		},
		productType: {
			label: 'setOfWheels',
			value: 'setOfWheels',
		},
		size: {
			from: 22,
			to: Infinity,
		},
		volume: 0.44,
		weight: 72,
		specification: {
			label: 'withTires',
			value: 'withTires',
		},
		price: 130,
	},
	// Kita sub kategorija

	// doors
	{
		category: {
			label: 'automotiveGoods',
			value: 'automotiveGoods',
		},
		productType: {
			label: 'doors',
			value: 'doors',
		},
		size: {
			label: 'microCars',
			value: 'microCars',
		},
		volume: 0.15,
		weight: 15,
		specification: null,
		price: 45,
	},
	{
		category: {
			label: 'automotiveGoods',
			value: 'automotiveGoods',
		},
		productType: {
			label: 'doors',
			value: 'doors',
		},
		size: {
			label: 'subcompactCars',
			value: 'subcompactCars',
		},
		volume: 0.18,
		weight: 18,
		specification: null,
		price: 45,
	},
	{
		category: {
			label: 'automotiveGoods',
			value: 'automotiveGoods',
		},
		productType: {
			label: 'doors',
			value: 'doors',
		},
		size: {
			label: 'compactCars',
			value: 'compactCars',
		},
		volume: 0.2,
		weight: 20,
		specification: null,
		price: 50,
	},
	{
		category: {
			label: 'automotiveGoods',
			value: 'automotiveGoods',
		},
		productType: {
			label: 'doors',
			value: 'doors',
		},
		size: {
			label: 'midSizeCars',
			value: 'midSizeCars',
		},
		volume: 0.25,
		weight: 22,
		specification: null,
		price: 50,
	},
	{
		category: {
			label: 'automotiveGoods',
			value: 'automotiveGoods',
		},
		productType: {
			label: 'doors',
			value: 'doors',
		},
		size: {
			label: 'bigCars',
			value: 'bigCars',
		},
		volume: 0.3,
		weight: 25,
		specification: null,
		price: 55,
	},
	{
		category: {
			label: 'automotiveGoods',
			value: 'automotiveGoods',
		},
		productType: {
			label: 'doors',
			value: 'doors',
		},
		size: {
			label: 'suvs',
			value: 'suvs',
		},
		volume: 0.35,
		weight: 30,
		specification: null,
		price: 55,
	},
	{
		category: {
			label: 'automotiveGoods',
			value: 'automotiveGoods',
		},
		productType: {
			label: 'doors',
			value: 'doors',
		},
		size: {
			label: 'pickupTrucks',
			value: 'pickupTrucks',
		},
		volume: 0.4,
		weight: 35,
		specification: null,
		price: 60,
	},
	{
		category: {
			label: 'automotiveGoods',
			value: 'automotiveGoods',
		},
		productType: {
			label: 'doors',
			value: 'doors',
		},
		size: {
			label: 'minibuses',
			value: 'minibuses',
		},
		volume: 0.45,
		weight: 40,
		specification: null,
		price: 85,
	},
	// interior
	// allways need to call manager
	{
		category: {
			label: 'automotiveGoods',
			value: 'automotiveGoods',
		},
		productType: {
			label: 'interior',
			value: 'interior',
		},
		size: null,
		callManager: true,
		volume: 0,
		weight: 0,
		specification: null,
		price: 0,
	},

	// carQuarter
	// allways need to call manager
	{
		category: {
			label: 'automotiveGoods',
			value: 'automotiveGoods',
		},
		productType: {
			label: 'carQuarter',
			value: 'carQuarter',
		},
		size: null,
		callManager: true,
		volume: 0,
		weight: 0,
		specification: null,
		price: 0,
	},

	// bumper
	{
		category: {
			label: 'automotiveGoods',
			value: 'automotiveGoods',
		},
		productType: {
			label: 'bumper',
			value: 'bumper',
		},
		size: {
			label: 'microCars',
			value: 'microCars',
		},
		volume: 0.12,
		weight: 8,
		specification: null,
		price: 60,
	},
	{
		category: {
			label: 'automotiveGoods',
			value: 'automotiveGoods',
		},
		productType: {
			label: 'bumper',
			value: 'bumper',
		},
		size: {
			label: 'subcompactCars',
			value: 'subcompactCars',
		},
		volume: 0.15,
		weight: 10,
		specification: null,
		price: 60,
	},
	{
		category: {
			label: 'automotiveGoods',
			value: 'automotiveGoods',
		},
		productType: {
			label: 'bumper',
			value: 'bumper',
		},
		size: {
			label: 'compactCars',
			value: 'compactCars',
		},
		volume: 0.18,
		weight: 12,
		specification: null,
		price: 70,
	},
	{
		category: {
			label: 'automotiveGoods',
			value: 'automotiveGoods',
		},
		productType: {
			label: 'bumper',
			value: 'bumper',
		},
		size: {
			label: 'midSizeCars',
			value: 'midSizeCars',
		},
		volume: 0.22,
		weight: 15,
		specification: null,
		price: 75,
	},
	{
		category: {
			label: 'automotiveGoods',
			value: 'automotiveGoods',
		},
		productType: {
			label: 'bumper',
			value: 'bumper',
		},
		size: {
			label: 'bigCars',
			value: 'bigCars',
		},
		volume: 0.25,
		weight: 18,
		specification: null,
		price: 80,
	},
	{
		category: {
			label: 'automotiveGoods',
			value: 'automotiveGoods',
		},
		productType: {
			label: 'bumper',
			value: 'bumper',
		},
		size: {
			label: 'suvs',
			value: 'suvs',
		},
		volume: 0.28,
		weight: 20,
		specification: null,
		price: 85,
	},
	{
		category: {
			label: 'automotiveGoods',
			value: 'automotiveGoods',
		},
		productType: {
			label: 'bumper',
			value: 'bumper',
		},
		size: {
			label: 'pickupTrucks',
			value: 'pickupTrucks',
		},
		volume: 0.3,
		weight: 22,
		specification: null,
		price: 85,
	},
	{
		category: {
			label: 'automotiveGoods',
			value: 'automotiveGoods',
		},
		productType: {
			label: 'bumper',
			value: 'bumper',
		},
		size: {
			label: 'minibuses',
			value: 'minibuses',
		},
		volume: 0.35,
		weight: 25,
		specification: null,
		price: 85,
	},
	// cover
	{
		category: {
			label: 'automotiveGoods',
			value: 'automotiveGoods',
		},
		productType: {
			label: 'cover',
			value: 'cover',
		},
		size: {
			label: 'microCars',
			value: 'microCars',
		},
		volume: 0.12,
		weight: 10,
		specification: null,
		price: 55,
	},
	{
		category: {
			label: 'automotiveGoods',
			value: 'automotiveGoods',
		},
		productType: {
			label: 'cover',
			value: 'cover',
		},
		size: {
			label: 'subcompactCars',
			value: 'subcompactCars',
		},
		volume: 0.15,
		weight: 12,
		specification: null,
		price: 55,
	},
	{
		category: {
			label: 'automotiveGoods',
			value: 'automotiveGoods',
		},
		productType: {
			label: 'cover',
			value: 'cover',
		},
		size: {
			label: 'compactCars',
			value: 'compactCars',
		},
		volume: 0.18,
		weight: 15,
		specification: null,
		price: 60,
	},
	{
		category: {
			label: 'automotiveGoods',
			value: 'automotiveGoods',
		},
		productType: {
			label: 'cover',
			value: 'cover',
		},
		size: {
			label: 'midSizeCars',
			value: 'midSizeCars',
		},
		volume: 0.22,
		weight: 18,
		specification: null,
		price: 65,
	},
	{
		category: {
			label: 'automotiveGoods',
			value: 'automotiveGoods',
		},
		productType: {
			label: 'cover',
			value: 'cover',
		},
		size: {
			label: 'bigCars',
			value: 'bigCars',
		},
		volume: 0.25,
		weight: 20,
		specification: null,
		price: 80,
	},
	{
		category: {
			label: 'automotiveGoods',
			value: 'automotiveGoods',
		},
		productType: {
			label: 'cover',
			value: 'cover',
		},
		size: {
			label: 'suvs',
			value: 'suvs',
		},
		volume: 0.28,
		weight: 22,
		specification: null,
		price: 80,
	},
	{
		category: {
			label: 'automotiveGoods',
			value: 'automotiveGoods',
		},
		productType: {
			label: 'cover',
			value: 'cover',
		},
		size: {
			label: 'pickupTrucks',
			value: 'pickupTrucks',
		},
		volume: 0.3,
		weight: 25,
		specification: null,
		price: 80,
	},
	{
		category: {
			label: 'automotiveGoods',
			value: 'automotiveGoods',
		},
		productType: {
			label: 'cover',
			value: 'cover',
		},
		size: {
			label: 'minibuses',
			value: 'minibuses',
		},
		volume: 0.35,
		weight: 28,
		specification: null,
		price: 85,
	},
	// engine
	// engine full = true
	// engine empty = false
	{
		category: {
			label: 'automotiveGoods',
			value: 'automotiveGoods',
		},
		productType: {
			label: 'engine',
			value: 'engine',
		},
		size: {
			from: 0,
			to: 999,
		},
		volume: 0.14,
		weight: 75,
		specification: {
			label: 'empty',
			value: 'empty',
		},
		price: 80,
	},
	{
		category: {
			label: 'automotiveGoods',
			value: 'automotiveGoods',
		},
		productType: {
			label: 'engine',
			value: 'engine',
		},
		size: {
			from: 0,
			to: 999,
		},
		volume: 0.14,
		weight: 85,
		specification: {
			label: 'full',
			value: 'full',
		},
		price: 120,
	},
	{
		category: {
			label: 'automotiveGoods',
			value: 'automotiveGoods',
		},
		productType: {
			label: 'engine',
			value: 'engine',
		},
		size: {
			from: 1000,
			to: 1499,
		},
		volume: 0.18,
		weight: 100,
		specification: {
			label: 'empty',
			value: 'empty',
		},
		price: 100,
	},
	{
		category: {
			label: 'automotiveGoods',
			value: 'automotiveGoods',
		},
		productType: {
			label: 'engine',
			value: 'engine',
		},
		size: {
			from: 1000,
			to: 1499,
		},
		volume: 0.18,
		weight: 115,
		specification: {
			label: 'full',
			value: 'full',
		},
		price: 170,
	},
	{
		category: {
			label: 'automotiveGoods',
			value: 'automotiveGoods',
		},
		productType: {
			label: 'engine',
			value: 'engine',
		},
		size: {
			from: 1500,
			to: 1999,
		},
		volume: 0.23,
		weight: 125,
		specification: {
			label: 'empty',
			value: 'empty',
		},
		price: 120,
	},
	{
		category: {
			label: 'automotiveGoods',
			value: 'automotiveGoods',
		},
		productType: {
			label: 'engine',
			value: 'engine',
		},
		size: {
			from: 1500,
			to: 1999,
		},
		volume: 0.23,
		weight: 145,
		specification: {
			label: 'full',
			value: 'full',
		},
		price: 200,
	},
	{
		category: {
			label: 'automotiveGoods',
			value: 'automotiveGoods',
		},
		productType: {
			label: 'engine',
			value: 'engine',
		},
		size: {
			from: 2000,
			to: 2499,
		},
		volume: 0.29,
		weight: 155,
		specification: {
			label: 'empty',
			value: 'empty',
		},
		price: 150,
	},
	{
		category: {
			label: 'automotiveGoods',
			value: 'automotiveGoods',
		},
		productType: {
			label: 'engine',
			value: 'engine',
		},
		size: {
			from: 2000,
			to: 2499,
		},
		volume: 0.29,
		weight: 180,
		specification: {
			label: 'full',
			value: 'full',
		},
		price: 250,
	},
	{
		category: {
			label: 'automotiveGoods',
			value: 'automotiveGoods',
		},
		productType: {
			label: 'engine',
			value: 'engine',
		},
		size: {
			from: 2500,
			to: 2999,
		},
		volume: 0.36,
		weight: 190,
		specification: {
			label: 'empty',
			value: 'empty',
		},
		price: 180,
	},
	{
		category: {
			label: 'automotiveGoods',
			value: 'automotiveGoods',
		},
		productType: {
			label: 'engine',
			value: 'engine',
		},
		size: {
			from: 2500,
			to: 2999,
		},
		volume: 0.36,
		weight: 220,
		specification: {
			label: 'full',
			value: 'full',
		},
		price: 300,
	},
	{
		category: {
			label: 'automotiveGoods',
			value: 'automotiveGoods',
		},
		productType: {
			label: 'engine',
			value: 'engine',
		},
		size: {
			from: 3000,
			to: 3499,
		},
		volume: 0.45,
		weight: 215,
		specification: {
			label: 'empty',
			value: 'empty',
		},
		price: 200,
	},
	{
		category: {
			label: 'automotiveGoods',
			value: 'automotiveGoods',
		},
		productType: {
			label: 'engine',
			value: 'engine',
		},
		size: {
			from: 3000,
			to: 3499,
		},
		volume: 0.45,
		weight: 250,
		specification: {
			label: 'full',
			value: 'full',
		},
		price: 350,
	},
	{
		category: {
			label: 'automotiveGoods',
			value: 'automotiveGoods',
		},
		productType: {
			label: 'engine',
			value: 'engine',
		},
		size: {
			from: 3500,
			to: 3999,
		},
		volume: 0.54,
		weight: 250,
		specification: {
			label: 'empty',
			value: 'empty',
		},
		price: 230,
	},
	{
		category: {
			label: 'automotiveGoods',
			value: 'automotiveGoods',
		},
		productType: {
			label: 'engine',
			value: 'engine',
		},
		size: {
			from: 3500,
			to: 3999,
		},
		volume: 0.54,
		weight: 290,
		specification: {
			label: 'full',
			value: 'full',
		},
		price: 370,
	},
	{
		category: {
			label: 'automotiveGoods',
			value: 'automotiveGoods',
		},
		productType: {
			label: 'engine',
			value: 'engine',
		},
		size: {
			from: 4000,
			to: Infinity,
		},
		volume: 0.63,
		weight: 300,
		specification: {
			label: 'empty',
			value: 'empty',
		},
		price: 250,
	},
	{
		category: {
			label: 'automotiveGoods',
			value: 'automotiveGoods',
		},
		productType: {
			label: 'engine',
			value: 'engine',
		},
		size: {
			from: 4000,
			to: Infinity,
		},
		volume: 0.63,
		weight: 340,
		specification: {
			label: 'full',
			value: 'full',
		},
		price: 400,
	},

	// transmision
	// specification: true => manual
	// specification: false => Automatine
	{
		category: {
			label: 'automotiveGoods',
			value: 'automotiveGoods',
		},
		productType: {
			label: 'gearbox',
			value: 'gearbox',
		},
		size: {
			from: 0,
			to: 999,
		},
		volume: 0.3,
		weight: 30,
		specification: {
			label: 'automatic',
			value: 'automatic',
		},
		price: 50,
	},
	{
		category: {
			label: 'automotiveGoods',
			value: 'automotiveGoods',
		},
		productType: {
			label: 'gearbox',
			value: 'gearbox',
		},
		size: {
			from: 0,
			to: 999,
		},
		volume: 0.025,
		weight: 25,
		specification: {
			label: 'manual',
			value: 'manual',
		},
		price: 45,
	},
	{
		category: {
			label: 'automotiveGoods',
			value: 'automotiveGoods',
		},
		productType: {
			label: 'gearbox',
			value: 'gearbox',
		},
		size: {
			from: 1000,
			to: 1499,
		},
		volume: 0.035,
		weight: 40,
		specification: {
			label: 'automatic',
			value: 'automatic',
		},
		price: 65,
	},
	{
		category: {
			label: 'automotiveGoods',
			value: 'automotiveGoods',
		},
		productType: {
			label: 'gearbox',
			value: 'gearbox',
		},
		size: {
			from: 1000,
			to: 1499,
		},
		volume: 0.03,
		weight: 35,
		specification: {
			label: 'manual',
			value: 'manual',
		},
		price: 50,
	},
	{
		category: {
			label: 'automotiveGoods',
			value: 'automotiveGoods',
		},
		productType: {
			label: 'gearbox',
			value: 'gearbox',
		},
		size: {
			from: 1500,
			to: 1999,
		},
		volume: 0.4,
		weight: 50,
		specification: {
			label: 'automatic',
			value: 'automatic',
		},
		price: 75,
	},
	{
		category: {
			label: 'automotiveGoods',
			value: 'automotiveGoods',
		},
		productType: {
			label: 'gearbox',
			value: 'gearbox',
		},
		size: {
			from: 1500,
			to: 1999,
		},
		volume: 0.035,
		weight: 45,
		specification: {
			label: 'manual',
			value: 'manual',
		},
		price: 60,
	},
	{
		category: {
			label: 'automotiveGoods',
			value: 'automotiveGoods',
		},
		productType: {
			label: 'gearbox',
			value: 'gearbox',
		},
		size: {
			from: 2000,
			to: 2499,
		},
		volume: 0.045,
		weight: 60,
		specification: {
			label: 'automatic',
			value: 'automatic',
		},
		price: 85,
	},
	{
		category: {
			label: 'automotiveGoods',
			value: 'automotiveGoods',
		},
		productType: {
			label: 'gearbox',
			value: 'gearbox',
		},
		size: {
			from: 2000,
			to: 2499,
		},
		volume: 0.4,
		weight: 55,
		specification: {
			label: 'manual',
			value: 'manual',
		},
		price: 75,
	},
	{
		category: {
			label: 'automotiveGoods',
			value: 'automotiveGoods',
		},
		productType: {
			label: 'gearbox',
			value: 'gearbox',
		},
		size: {
			from: 2500,
			to: 2999,
		},
		volume: 0.05,
		weight: 70,
		specification: {
			label: 'automatic',
			value: 'automatic',
		},
		price: 120,
	},
	{
		category: {
			label: 'automotiveGoods',
			value: 'automotiveGoods',
		},
		productType: {
			label: 'gearbox',
			value: 'gearbox',
		},
		size: {
			from: 2500,
			to: 2999,
		},
		volume: 0.045,
		weight: 65,
		specification: {
			label: 'manual',
			value: 'manual',
		},
		price: 85,
	},
	{
		category: {
			label: 'automotiveGoods',
			value: 'automotiveGoods',
		},
		productType: {
			label: 'gearbox',
			value: 'gearbox',
		},
		size: {
			from: 3000,
			to: 3499,
		},
		volume: 0.055,
		weight: 80,
		specification: {
			label: 'automatic',
			value: 'automatic',
		},
		price: 120,
	},
	{
		category: {
			label: 'automotiveGoods',
			value: 'automotiveGoods',
		},
		productType: {
			label: 'gearbox',
			value: 'gearbox',
		},
		size: {
			from: 3000,
			to: 3499,
		},
		volume: 0.05,
		weight: 75,
		specification: {
			label: 'manual',
			value: 'manual',
		},
		price: 120,
	},
	{
		category: {
			label: 'automotiveGoods',
			value: 'automotiveGoods',
		},
		productType: {
			label: 'gearbox',
			value: 'gearbox',
		},
		size: {
			from: 3500,
			to: 3999,
		},
		volume: 0.06,
		weight: 90,
		specification: {
			label: 'automatic',
			value: 'automatic',
		},
		price: 120,
	},
	{
		category: {
			label: 'automotiveGoods',
			value: 'automotiveGoods',
		},
		productType: {
			label: 'gearbox',
			value: 'gearbox',
		},
		size: {
			from: 3500,
			to: 3999,
		},
		volume: 0.055,
		weight: 85,
		specification: {
			label: 'manual',
			value: 'manual',
		},
		price: 120,
	},
	{
		category: {
			label: 'automotiveGoods',
			value: 'automotiveGoods',
		},
		productType: {
			label: 'gearbox',
			value: 'gearbox',
		},
		size: {
			from: 4000,
			to: Infinity,
		},
		volume: 0.07,
		weight: 100,
		specification: {
			label: 'automatic',
			value: 'automatic',
		},
		price: 120,
	},
	{
		category: {
			label: 'automotiveGoods',
			value: 'automotiveGoods',
		},
		productType: {
			label: 'gearbox',
			value: 'gearbox',
		},
		size: {
			from: 4000,
			to: Infinity,
		},
		volume: 0.06,
		weight: 95,
		specification: {
			label: 'manual',
			value: 'manual',
		},
		price: 120,
	},
];

export const bicyclesAndScootersCategoryProducts: CommonProductTypeExample[] = [
  // childBicycleAndTricycle
  {
    category: {
      label: 'bicyclesAndScooters',
      value: 'bicyclesAndScooters',
    },
    productType: {
      label: 'childBicycleAndTricycle',
      value: 'childBicycleAndTricycle',
    },
    size: {
      label: 'fullyAssembled',
      value: 'fullyAssembled',
    },
    volume: 0.35,
    weight: 7,
    specification: null,
    price: 40,
  },
  {
    category: {
      label: 'bicyclesAndScooters',
      value: 'bicyclesAndScooters',
    },
    productType: {
      label: 'childBicycleAndTricycle',
      value: 'childBicycleAndTricycle',
    },
    size: {
      label: 'dismantled',
      value: 'dismantled',
    },
    volume: 0.25,
    weight: 7,
    specification: null,
    price: 35,
  },
  // teenagersBike
  {
    category: {
      label: 'bicyclesAndScooters',
      value: 'bicyclesAndScooters',
    },
    productType: {
      label: 'teenagersBike',
      value: 'teenagersBike',
    },
    size: {
      label: 'fullyAssembled',
      value: 'fullyAssembled',
    },
    volume: 0.45,
    weight: 12,
    specification: null,
    price: 45,
  },
  {
    category: {
      label: 'bicyclesAndScooters',
      value: 'bicyclesAndScooters',
    },
    productType: {
      label: 'teenagersBike',
      value: 'teenagersBike',
    },
    size: {
      label: 'dismantled',
      value: 'dismantled',
    },
    volume: 0.3,
    weight: 12,
    specification: null,
    price: 40,
  },
  // adultBike
  {
    category: {
      label: 'bicyclesAndScooters',
      value: 'bicyclesAndScooters',
    },
    productType: {
      label: 'adultBike',
      value: 'adultBike',
    },
    size: {
      label: 'fullyAssembled',
      value: 'fullyAssembled',
    },
    volume: 0.55,
    weight: 14,
    specification: null,
    price: 65,
  },
  {
    category: {
      label: 'bicyclesAndScooters',
      value: 'bicyclesAndScooters',
    },
    productType: {
      label: 'adultBike',
      value: 'adultBike',
    },
    size: {
      label: 'dismantled',
      value: 'dismantled',
    },
    volume: 0.4,
    weight: 14,
    specification: null,
    price: 50,
  },
  // electricBike
  {
    category: {
      label: 'bicyclesAndScooters',
      value: 'bicyclesAndScooters',
    },
    productType: {
      label: 'electricBike',
      value: 'electricBike',
    },
    size: {
      label: 'fullyAssembled',
      value: 'fullyAssembled',
    },
    volume: 0.65,
    weight: 25,
    specification: null,
    price: 75,
  },
  {
    category: {
      label: 'bicyclesAndScooters',
      value: 'bicyclesAndScooters',
    },
    productType: {
      label: 'electricBike',
      value: 'electricBike',
    },
    size: {
      label: 'dismantled',
      value: 'dismantled',
    },
    volume: 0.55,
    weight: 25,
    specification: null,
    price: 65,
  },
  // childBicycleTrailer
  {
    category: {
      label: 'bicyclesAndScooters',
      value: 'bicyclesAndScooters',
    },
    productType: {
      label: 'childBicycleTrailer',
      value: 'childBicycleTrailer',
    },
    size: {
      label: 'fullyAssembled',
      value: 'fullyAssembled',
    },
    volume: 0.4,
    weight: 10,
    specification: null,
    price: 75,
  },
  {
    category: {
      label: 'bicyclesAndScooters',
      value: 'bicyclesAndScooters',
    },
    productType: {
      label: 'childBicycleTrailer',
      value: 'childBicycleTrailer',
    },
    size: {
      label: 'dismantled',
      value: 'dismantled',
    },
    volume: 0.25,
    weight: 8,
    specification: null,
    price: 60,
  },
  // electricScooter
  {
    category: {
      label: 'bicyclesAndScooters',
      value: 'bicyclesAndScooters',
    },
    productType: {
      label: 'electricScooter',
      value: 'electricScooter',
    },
    size: {
      from: 0,
      to: 24,
    },
    volume: 0.15,
    weight: 12,
    specification: null,
    price: 45,
  },
  {
    category: {
      label: 'bicyclesAndScooters',
      value: 'bicyclesAndScooters',
    },
    productType: {
      label: 'electricScooter',
      value: 'electricScooter',
    },
    size: {
      from: 25,
      to: Infinity,
    },
    volume: 0.18,
    weight: 15,
    specification: null,
    price: 60,
  },
];

export const goodsForChildrenCategoryProducts: CommonProductTypeExample[] = [
  // childSeat

  {
    category: {
      label: 'goodsForChildren',
      value: 'goodsForChildren',
    },
    productType: {
      label: 'childSeat',
      value: 'childSeat',
    },
    size: {
      label: 'withoutSole',
      value: 'withoutSole',
    },
    volume: 0.1,
    weight: 7,
    specification: null,
    price: 40,
  },
  {
    category: {
      label: 'goodsForChildren',
      value: 'goodsForChildren',
    },
    productType: {
      label: 'childSeat',
      value: 'childSeat',
    },
    size: {
      label: 'withSole',
      value: 'withSole',
    },
    volume: 0.15,
    weight: 10,
    specification: null,
    price: 45,
  },

  // strollers

  {
    category: {
      label: 'goodsForChildren',
      value: 'goodsForChildren',
    },
    productType: {
      label: 'strollers',
      value: 'strollers',
    },
    size: {
      label: 'umbrella',
      value: 'umbrella',
    },
    volume: 0.8,
    weight: 5,
    specification: null,
    price: 45,
  },
  {
    category: {
      label: 'goodsForChildren',
      value: 'goodsForChildren',
    },
    productType: {
      label: 'strollers',
      value: 'strollers',
    },
    size: {
      label: 'sport',
      value: 'sport',
    },
    volume: 0.2,
    weight: 12,
    specification: null,
    price: 50,
  },
  {
    category: {
      label: 'goodsForChildren',
      value: 'goodsForChildren',
    },
    productType: {
      label: 'strollers',
      value: 'strollers',
    },
    size: {
      label: 'cradleStroller',
      value: 'cradleStroller',
    },
    volume: 0.25,
    weight: 14,
    specification: null,
    price: 65,
  },
  {
    category: {
      label: 'goodsForChildren',
      value: 'goodsForChildren',
    },
    productType: {
      label: 'strollers',
      value: 'strollers',
    },
    size: {
      label: 'forTwins',
      value: 'forTwins',
    },
    volume: 0.35,
    weight: 20,
    specification: null,
    price: 75,
  },
  {
    category: {
      label: 'goodsForChildren',
      value: 'goodsForChildren',
    },
    productType: {
      label: 'strollers',
      value: 'strollers',
    },
    size: {
      label: '2in1',
      value: '2in1',
    },
    volume: 0.3,
    weight: 15,
    specification: null,
    price: 75,
  },
  {
    category: {
      label: 'goodsForChildren',
      value: 'goodsForChildren',
    },
    productType: {
      label: 'strollers',
      value: 'strollers',
    },
    size: {
      label: '3in1',
      value: '3in1',
    },
    volume: 0.4,
    weight: 18,
    specification: null,
    price: 85,
  },
];

export const motorcyclesAndAccessoriesCategoryProducts: CommonProductTypeExample[] =
  [
    // scooterMoped
    {
      category: {
        label: 'motorcyclesAndAccessories',
        value: 'motorcyclesAndAccessories',
      },
      productType: {
        label: 'scooterMoped',
        value: 'scooterMoped',
      },
      size: {
        from: 0,
        to: 49,
      },
      volume: 0.4,
      weight: 45,
      specification: null,
      price: 120,
    },
    {
      category: {
        label: 'motorcyclesAndAccessories',
        value: 'motorcyclesAndAccessories',
      },
      productType: {
        label: 'scooterMoped',
        value: 'scooterMoped',
      },
      size: {
        from: 50,
        to: 124,
      },
      volume: 0.5,
      weight: 90,
      specification: null,
      price: 160,
    },
    {
      category: {
        label: 'motorcyclesAndAccessories',
        value: 'motorcyclesAndAccessories',
      },
      productType: {
        label: 'scooterMoped',
        value: 'scooterMoped',
      },
      size: {
        from: 125,
        to: 249,
      },
      volume: 0.6,
      weight: 130,
      specification: null,
      price: 200,
    },
    {
      category: {
        label: 'motorcyclesAndAccessories',
        value: 'motorcyclesAndAccessories',
      },
      productType: {
        label: 'scooterMoped',
        value: 'scooterMoped',
      },
      size: {
        from: 250,
        to: Infinity,
      },
      volume: 0.7,
      weight: 170,
      specification: null,
      price: 270,
    },
    // Standartinis motociklas standardMotorcycle
    {
      category: {
        label: 'motorcyclesAndAccessories',
        value: 'motorcyclesAndAccessories',
      },
      productType: {
        label: 'standardMotorcycle',
        value: 'standardMotorcycle',
      },
      size: {
        from: 0,
        to: 499,
      },
      volume: 0.55,
      weight: 170,
      specification: null,
      price: 250,
    },
    {
      category: {
        label: 'motorcyclesAndAccessories',
        value: 'motorcyclesAndAccessories',
      },
      productType: {
        label: 'standardMotorcycle',
        value: 'standardMotorcycle',
      },
      size: {
        from: 500,
        to: 749,
      },
      volume: 0.65,
      weight: 190,
      specification: null,
      price: 270,
    },
    {
      category: {
        label: 'motorcyclesAndAccessories',
        value: 'motorcyclesAndAccessories',
      },
      productType: {
        label: 'standardMotorcycle',
        value: 'standardMotorcycle',
      },
      size: {
        from: 750,
        to: 999,
      },
      volume: 0.75,
      weight: 210,
      specification: null,
      price: 300,
    },
    {
      category: {
        label: 'motorcyclesAndAccessories',
        value: 'motorcyclesAndAccessories',
      },
      productType: {
        label: 'standardMotorcycle',
        value: 'standardMotorcycle',
      },
      size: {
        from: 1000,
        to: Infinity,
      },
      volume: 0.9,
      weight: 230,
      specification: null,
      price: 330,
    },
    // Krosinis motociklas motocrossMotorcycle
    {
      category: {
        label: 'motorcyclesAndAccessories',
        value: 'motorcyclesAndAccessories',
      },
      productType: {
        label: 'motocrossMotorcycle',
        value: 'motocrossMotorcycle',
      },
      size: {
        from: 0,
        to: 124,
      },
      volume: 0.5,
      weight: 75,
      specification: null,
      price: 150,
    },
    {
      category: {
        label: 'motorcyclesAndAccessories',
        value: 'motorcyclesAndAccessories',
      },
      productType: {
        label: 'motocrossMotorcycle',
        value: 'motocrossMotorcycle',
      },
      size: {
        from: 125,
        to: 249,
      },
      volume: 0.55,
      weight: 105,
      specification: null,
      price: 180,
    },
    {
      category: {
        label: 'motorcyclesAndAccessories',
        value: 'motorcyclesAndAccessories',
      },
      productType: {
        label: 'motocrossMotorcycle',
        value: 'motocrossMotorcycle',
      },
      size: {
        from: 250,
        to: 449,
      },
      volume: 0.6,
      weight: 115,
      specification: null,
      price: 230,
    },
    {
      category: {
        label: 'motorcyclesAndAccessories',
        value: 'motorcyclesAndAccessories',
      },
      productType: {
        label: 'motocrossMotorcycle',
        value: 'motocrossMotorcycle',
      },
      size: {
        from: 450,
        to: Infinity,
      },
      volume: 0.6,
      weight: 115,
      specification: null,
      price: 260,
    },
    // Kelioninis  motociklass touringMotorcycle
    {
      category: {
        label: 'motorcyclesAndAccessories',
        value: 'motorcyclesAndAccessories',
      },
      productType: {
        label: 'touringMotorcycle',
        value: 'touringMotorcycle',
      },
      size: {
        from: 0,
        to: 799,
      },
      volume: 0.8,
      weight: 230,
      specification: null,
      price: 300,
    },
    {
      category: {
        label: 'motorcyclesAndAccessories',
        value: 'motorcyclesAndAccessories',
      },
      productType: {
        label: 'touringMotorcycle',
        value: 'touringMotorcycle',
      },
      size: {
        from: 800,
        to: 1199,
      },
      volume: 0.95,
      weight: 260,
      specification: null,
      price: 350,
    },
    {
      category: {
        label: 'motorcyclesAndAccessories',
        value: 'motorcyclesAndAccessories',
      },
      productType: {
        label: 'touringMotorcycle',
        value: 'touringMotorcycle',
      },
      size: {
        from: 1200,
        to: 1599,
      },
      volume: 1.1,
      weight: 320,
      specification: null,
      price: 400,
    },
    {
      category: {
        label: 'motorcyclesAndAccessories',
        value: 'motorcyclesAndAccessories',
      },
      productType: {
        label: 'touringMotorcycle',
        value: 'touringMotorcycle',
      },
      size: {
        from: 1600,
        to: Infinity,
      },
      volume: 1.25,
      weight: 400,
      specification: null,
      price: 430,
    },
    // Sportinis  motociklas sportsMotorcycle
    {
      category: {
        label: 'motorcyclesAndAccessories',
        value: 'motorcyclesAndAccessories',
      },
      productType: {
        label: 'sportsMotorcycle',
        value: 'sportsMotorcycle',
      },
      size: {
        from: 0,
        to: 599,
      },
      volume: 0.45,
      weight: 160,
      specification: null,
      price: 230,
    },
    {
      category: {
        label: 'motorcyclesAndAccessories',
        value: 'motorcyclesAndAccessories',
      },
      productType: {
        label: 'sportsMotorcycle',
        value: 'sportsMotorcycle',
      },
      size: {
        from: 600,
        to: 999,
      },
      volume: 0.55,
      weight: 195,
      specification: null,
      price: 260,
    },
    {
      category: {
        label: 'motorcyclesAndAccessories',
        value: 'motorcyclesAndAccessories',
      },
      productType: {
        label: 'sportsMotorcycle',
        value: 'sportsMotorcycle',
      },
      size: {
        from: 1000,
        to: Infinity,
      },
      volume: 0.65,
      weight: 210,
      specification: null,
      price: 280,
    },
    // chopper chopper
    {
      category: {
        label: 'motorcyclesAndAccessories',
        value: 'motorcyclesAndAccessories',
      },
      productType: {
        label: 'chopper',
        value: 'chopper',
      },
      size: {
        from: 0,
        to: 799,
      },
      volume: 0.65,
      weight: 220,
      specification: null,
      price: 300,
    },
    {
      category: {
        label: 'motorcyclesAndAccessories',
        value: 'motorcyclesAndAccessories',
      },
      productType: {
        label: 'chopper',
        value: 'chopper',
      },
      size: {
        from: 800,
        to: 1199,
      },
      volume: 0.75,
      weight: 250,
      specification: null,
      price: 350,
    },
    {
      category: {
        label: 'motorcyclesAndAccessories',
        value: 'motorcyclesAndAccessories',
      },
      productType: {
        label: 'chopper',
        value: 'chopper',
      },
      size: {
        from: 1200,
        to: Infinity,
      },
      volume: 0.8,
      weight: 320,
      specification: null,
      price: 400,
    },
    // Enduro enduro
    {
      category: {
        label: 'motorcyclesAndAccessories',
        value: 'motorcyclesAndAccessories',
      },
      productType: {
        label: 'enduro',
        value: 'enduro',
      },
      size: {
        from: 0,
        to: 249,
      },
      volume: 0.5,
      weight: 135,
      specification: null,
      price: 200,
    },
    {
      category: {
        label: 'motorcyclesAndAccessories',
        value: 'motorcyclesAndAccessories',
      },
      productType: {
        label: 'enduro',
        value: 'enduro',
      },
      size: {
        from: 250,
        to: 649,
      },
      volume: 0.6,
      weight: 170,
      specification: null,
      price: 230,
    },
    {
      category: {
        label: 'motorcyclesAndAccessories',
        value: 'motorcyclesAndAccessories',
      },
      productType: {
        label: 'enduro',
        value: 'enduro',
      },
      size: {
        from: 650,
        to: 1199,
      },
      volume: 0.75,
      weight: 230,
      specification: null,
      price: 250,
    },
    {
      category: {
        label: 'motorcyclesAndAccessories',
        value: 'motorcyclesAndAccessories',
      },
      productType: {
        label: 'enduro',
        value: 'enduro',
      },
      size: {
        from: 1200,
        to: Infinity,
      },
      volume: 0.9,
      weight: 250,
      specification: null,
      price: 280,
    },
    // quadBike quadBike
    {
      category: {
        label: 'motorcyclesAndAccessories',
        value: 'motorcyclesAndAccessories',
      },
      productType: {
        label: 'quadBike',
        value: 'quadBike',
      },
      size: {
        from: 0,
        to: 399,
      },
      volume: 0.8,
      weight: 220,
      specification: null,
      price: 330,
    },
    {
      category: {
        label: 'motorcyclesAndAccessories',
        value: 'motorcyclesAndAccessories',
      },
      productType: {
        label: 'quadBike',
        value: 'quadBike',
      },
      size: {
        from: 400,
        to: 799,
      },
      volume: 1,
      weight: 280,
      specification: null,
      price: 360,
    },
    {
      category: {
        label: 'motorcyclesAndAccessories',
        value: 'motorcyclesAndAccessories',
      },
      productType: {
        label: 'quadBike',
        value: 'quadBike',
      },
      size: {
        from: 800,
        to: 1199,
      },
      volume: 1.25,
      weight: 340,
      specification: null,
      price: 400,
    },
    {
      category: {
        label: 'motorcyclesAndAccessories',
        value: 'motorcyclesAndAccessories',
      },
      productType: {
        label: 'quadBike',
        value: 'quadBike',
      },
      size: {
        from: 1200,
        to: Infinity,
      },
      volume: 1.5,
      weight: 400,
      specification: null,
      price: 400,
    },
    // Motociklo variklis motorcycleEngine
    {
      category: {
        label: 'motorcyclesAndAccessories',
        value: 'motorcyclesAndAccessories',
      },
      productType: {
        label: 'motorcycleEngine',
        value: 'motorcycleEngine',
      },
      size: {
        from: 0,
        to: 44,
      },
      volume: 0.01,
      weight: 15,
      specification: null,
      price: 45,
    },
    {
      category: {
        label: 'motorcyclesAndAccessories',
        value: 'motorcyclesAndAccessories',
      },
      productType: {
        label: 'motorcycleEngine',
        value: 'motorcycleEngine',
      },
      size: {
        from: 45,
        to: 249,
      },
      volume: 0.02,
      weight: 25,
      specification: null,
      price: 55,
    },
    {
      category: {
        label: 'motorcyclesAndAccessories',
        value: 'motorcyclesAndAccessories',
      },
      productType: {
        label: 'motorcycleEngine',
        value: 'motorcycleEngine',
      },
      size: {
        from: 250,
        to: 449,
      },
      volume: 0.03,
      weight: 35,
      specification: null,
      price: 65,
    },
    {
      category: {
        label: 'motorcyclesAndAccessories',
        value: 'motorcyclesAndAccessories',
      },
      productType: {
        label: 'motorcycleEngine',
        value: 'motorcycleEngine',
      },
      size: {
        from: 450,
        to: 599,
      },
      volume: 0.04,
      weight: 50,
      specification: null,
      price: 80,
    },
    {
      category: {
        label: 'motorcyclesAndAccessories',
        value: 'motorcyclesAndAccessories',
      },
      productType: {
        label: 'motorcycleEngine',
        value: 'motorcycleEngine',
      },
      size: {
        from: 600,
        to: 999,
      },
      volume: 0.06,
      weight: 70,
      specification: null,
      price: 90,
    },
    {
      category: {
        label: 'motorcyclesAndAccessories',
        value: 'motorcyclesAndAccessories',
      },
      productType: {
        label: 'motorcycleEngine',
        value: 'motorcycleEngine',
      },
      size: {
        from: 1000,
        to: 1199,
      },
      volume: 0.07,
      weight: 90,
      specification: null,
      price: 110,
    },
    {
      category: {
        label: 'motorcyclesAndAccessories',
        value: 'motorcyclesAndAccessories',
      },
      productType: {
        label: 'motorcycleEngine',
        value: 'motorcycleEngine',
      },
      size: {
        from: 1200,
        to: 1599,
      },
      volume: 0.09,
      weight: 110,
      specification: null,
      price: 150,
    },
    {
      category: {
        label: 'motorcyclesAndAccessories',
        value: 'motorcyclesAndAccessories',
      },
      productType: {
        label: 'motorcycleEngine',
        value: 'motorcycleEngine',
      },
      size: {
        from: 1600,
        to: Infinity,
      },
      volume: 0.11,
      weight: 130,
      specification: null,
      price: 190,
    },

    // goodsForMotorcycles Prekės motociklams
    {
      category: {
        label: 'motorcyclesAndAccessories',
        value: 'motorcyclesAndAccessories',
      },
      productType: {
        label: 'goodsForMotorcycles',
        value: 'goodsForMotorcycles',
      },
      size: {
        label: 'motorcycleBag',
        value: 'motorcycleBag',
      },
      volume: 0.01,
      weight: 5,
      specification: null,
      price: 35,
    },
    {
      category: {
        label: 'motorcyclesAndAccessories',
        value: 'motorcyclesAndAccessories',
      },
      productType: {
        label: 'goodsForMotorcycles',
        value: 'goodsForMotorcycles',
      },
      size: {
        label: 'muffler',
        value: 'muffler',
      },
      volume: 0.01,
      weight: 5,
      specification: null,
      price: 40,
    },
  ];

export const flatScreenTvCategoryProducts: CommonProductTypeExample[] = [
  {
    category: {
      label: 'flatScreenTv',
      value: 'flatScreenTv',
    },
    productType: null,
    size: {
      from: 0,
      to: 23,
    },
    volume: 0.04,
    weight: 4,
    specification: null,
    price: 45,
  },
  {
    category: {
      label: 'flatScreenTv',
      value: 'flatScreenTv',
    },
    productType: null,
    size: {
      from: 24,
      to: 31,
    },
    volume: 0.06,
    weight: 5,
    specification: null,
    price: 45,
  },
  {
    category: {
      label: 'flatScreenTv',
      value: 'flatScreenTv',
    },
    productType: null,
    size: {
      from: 32,
      to: 39,
    },
    volume: 0.08,
    weight: 8,
    specification: null,
    price: 50,
  },
  {
    category: {
      label: 'flatScreenTv',
      value: 'flatScreenTv',
    },
    productType: null,
    size: {
      from: 40,
      to: 42,
    },
    volume: 0.1,
    weight: 9,
    specification: null,
    price: 55,
  },
  {
    category: {
      label: 'flatScreenTv',
      value: 'flatScreenTv',
    },
    productType: null,
    size: {
      from: 43,
      to: 49,
    },
    volume: 0.12,
    weight: 12,
    specification: null,
    price: 60,
  },
  {
    category: {
      label: 'flatScreenTv',
      value: 'flatScreenTv',
    },
    productType: null,
    size: {
      from: 50,
      to: 54,
    },
    volume: 0.15,
    weight: 14,
    specification: null,
    price: 65,
  },
  {
    category: {
      label: 'flatScreenTv',
      value: 'flatScreenTv',
    },
    productType: null,
    size: {
      from: 55,
      to: 64,
    },
    volume: 0.2,
    weight: 18,
    specification: null,
    price: 75,
  },
  {
    category: {
      label: 'flatScreenTv',
      value: 'flatScreenTv',
    },
    productType: null,
    size: {
      from: 65,
      to: 69,
    },
    volume: 0.25,
    weight: 22,
    specification: null,
    price: 80,
  },
  {
    category: {
      label: 'flatScreenTv',
      value: 'flatScreenTv',
    },
    productType: null,
    size: {
      from: 70,
      to: 74,
    },
    volume: 0.3,
    weight: 25,
    specification: null,
    price: 85,
  },
  {
    category: {
      label: 'flatScreenTv',
      value: 'flatScreenTv',
    },
    productType: null,
    size: {
      from: 75,
      to: 84,
    },
    volume: 0.35,
    weight: 30,
    specification: null,
    price: 95,
  },
  {
    category: {
      label: 'flatScreenTv',
      value: 'flatScreenTv',
    },
    productType: null,
    size: {
      from: 85,
      to: Infinity,
    },
    volume: 0.4,
    weight: 35,
    specification: null,
    price: 105,
  },
];

export const householdAppliancesCategoryProducts: CommonProductTypeExample[] = [
  // TODO Think how we will calculate price for these
  {
    category: {
      label: 'householdAppliances',
      value: 'householdAppliances',
    },
    productType: {
      label: 'fridge',
      value: 'fridge',
    },
    volume: 1,
    weight: 0,
    size: null,
    specification: null,
    // skaiciuojama pagal kubus 1 kubinis metras 200 eu  aukshtis*plotis*gylis
    price: 200,
  },
  {
    category: {
      label: 'householdAppliances',
      value: 'householdAppliances',
    },
    productType: {
      label: 'freezer',
      value: 'freezer',
    },
    volume: 1,
    weight: 0,
    size: null,
    specification: null,
    // skaiciuojama pagal kubus 1 kubinis metras 200 eu  aukshtis*plotis*gylis
    price: 200,
  },
  {
    category: {
      label: 'householdAppliances',
      value: 'householdAppliances',
    },
    productType: {
      label: 'industrialDryer',
      value: 'industrialDryer',
    },
    volume: 0.4,
    weight: 40,
    size: null,
    specification: null,
    // skaiciuojama pagal kubus 1 kubinis metras 200 eu  aukshtis*plotis*gylis
    price: 70,
  },
  {
    category: {
      label: 'householdAppliances',
      value: 'householdAppliances',
    },
    productType: {
      label: 'industrialDishwasher',
      value: 'industrialDishwasher',
    },
    volume: 0.35,
    weight: 40,
    size: null,
    specification: null,
    // skaiciuojama pagal kubus 1 kubinis metras 200 eu  aukshtis*plotis*gylis
    price: 60,
  },
  // Skalbimo mašina washingMachine
  {
    category: {
      label: 'householdAppliances',
      value: 'householdAppliances',
    },
    productType: {
      label: 'washingMachine',
      value: 'washingMachine',
    },
    size: {
      label: 'smallWashingMachine',
      value: 'Talpa 3-5 kg',
    },
    volume: 0.15,
    weight: 40,
    specification: null,
    price: 50,
  },
  {
    category: {
      label: 'householdAppliances',
      value: 'householdAppliances',
    },
    productType: {
      label: 'washingMachine',
      value: 'washingMachine',
    },
    size: {
      label: 'mediumWashingMachine',
      value: 'Talpa 6-7 kg',
    },
    volume: 0.2,
    weight: 60,
    specification: null,
    price: 60,
  },
  {
    category: {
      label: 'householdAppliances',
      value: 'householdAppliances',
    },
    productType: {
      label: 'washingMachine',
      value: 'washingMachine',
    },
    size: {
      label: 'bigWashingMachine',
      value: 'Talpa 8-9 kg',
    },
    volume: 0.25,
    weight: 70,
    specification: null,
    price: 70,
  },
  {
    category: {
      label: 'householdAppliances',
      value: 'householdAppliances',
    },
    productType: {
      label: 'washingMachine',
      value: 'washingMachine',
    },
    size: {
      label: 'industrialWashingMachine',
      value: 'Talpa 10+ kg',
    },
    volume: 0.3,
    weight: 80,
    specification: null,
    price: 80,
  },
  {
    category: {
      label: 'householdAppliances',
      value: 'householdAppliances',
    },
    productType: {
      label: 'dishwasher',
      value: 'dishwasher',
    },
    volume: 0.35,
    weight: 40,
    size: null,
    specification: null,
    price: 50,
  },
  {
    category: {
      label: 'householdAppliances',
      value: 'householdAppliances',
    },
    productType: {
      label: 'dryer',
      value: 'dryer',
    },
    volume: 0.35,
    weight: 40,
    size: null,
    specification: null,
    price: 50,
  },
  {
    category: {
      label: 'householdAppliances',
      value: 'householdAppliances',
    },
    productType: {
      label: 'hob',
      value: 'hob',
    },
    volume: 0.1,
    weight: 15,
    size: null,
    specification: null,
    price: 45,
  },
  // Viryklė stove
  {
    category: {
      label: 'householdAppliances',
      value: 'householdAppliances',
    },
    productType: {
      label: 'stove',
      value: 'stove',
    },
    size: {
      label: 'built-in',
      value: 'built-in',
    },
    volume: 0.2,
    weight: 50,
    specification: null,
    price: 60,
  },
  {
    category: {
      label: 'householdAppliances',
      value: 'householdAppliances',
    },
    productType: {
      label: 'stove',
      value: 'stove',
    },
    size: {
      label: 'built-in',
      value: 'built-in',
    },
    volume: 0.6,
    weight: 60,
    specification: null,
    price: 70,
  },
  {
    category: {
      label: 'householdAppliances',
      value: 'householdAppliances',
    },
    productType: {
      label: 'stove',
      value: 'stove',
    },
    size: {
      label: 'withBurners',
      value: 'withBurners',
    },
    volume: 0.7,
    weight: 80,
    specification: null,
    price: 90,
  },
];

// specification: false,true   false=be surinkimo krepshio  , true= su surinkimo krepsiu

export const gardenEquipmentCategoryProducts: CommonProductTypeExample[] = [
  {
    category: {
      label: 'gardenEquipment',
      value: 'gardenEquipment',
    },
    productType: {
      label: 'smallGardenTractor',
      value: 'smallGardenTractor',
    },
    size: {
      from: 0,
      to: 79,
    },
    volume: 0.7,
    weight: 150,
    specification: {
      label: 'withoutAssemblyBag',
      value: 'withoutAssemblyBag',
    },
    price: 200,
  },
  {
    category: {
      label: 'gardenEquipment',
      value: 'gardenEquipment',
    },
    productType: {
      label: 'averageGardenTractor',
      value: 'averageGardenTractor',
    },
    size: {
      from: 80,
      to: 119,
    },
    volume: 1.2,
    weight: 200,
    specification: {
      label: 'withoutAssemblyBag',
      value: 'withoutAssemblyBag',
    },
    price: 230,
  },
  {
    category: {
      label: 'gardenEquipment',
      value: 'gardenEquipment',
    },
    productType: {
      label: 'bigGardenTractor',
      value: 'bigGardenTractor',
    },
    size: {
      from: 120,
      to: Infinity,
    },
    volume: 1.6,
    weight: 250,
    specification: {
      label: 'withoutAssemblyBag',
      value: 'withoutAssemblyBag',
    },
    price: 280,
  },
  {
    category: {
      label: 'gardenEquipment',
      value: 'gardenEquipment',
    },
    productType: {
      label: 'smallGardenTractor',
      value: 'smallGardenTractor',
    },
    size: {
      from: 0,
      to: 79,
    },
    volume: 0.85,
    weight: 160,
    specification: {
      label: 'withAssemblyBag',
      value: 'withAssemblyBag',
    },
    price: 240,
  },
  {
    category: {
      label: 'gardenEquipment',
      value: 'gardenEquipment',
    },
    productType: {
      label: 'averageGardenTractor',
      value: 'averageGardenTractor',
    },
    size: {
      from: 80,
      to: 119,
    },
    volume: 1.25,
    weight: 210,
    specification: {
      label: 'withAssemblyBag',
      value: 'withAssemblyBag',
    },
    price: 270,
  },
  {
    category: {
      label: 'gardenEquipment',
      value: 'gardenEquipment',
    },
    productType: {
      label: 'bigGardenTractor',
      value: 'bigGardenTractor',
    },
    size: {
      from: 120,
      to: Infinity,
    },
    volume: 1.7,
    weight: 260,
    specification: {
      label: 'withAssemblyBag',
      value: 'withAssemblyBag',
    },
    price: 320,
  },
  {
    category: {
      label: 'gardenEquipment',
      value: 'gardenEquipment',
    },
    productType: {
      label: 'smallPushMower',
      value: 'smallPushMower',
    },
    volume: 0.25,
    weight: 15,
    size: null,
    specification: null,
    price: 60,
  },
  {
    category: {
      label: 'gardenEquipment',
      value: 'gardenEquipment',
    },
    productType: {
      label: 'bigPushMower',
      value: 'bigPushMower',
    },
    volume: 0.3,
    weight: 25,
    size: null,
    specification: null,
    price: 70,
  },
  {
    category: {
      label: 'gardenEquipment',
      value: 'gardenEquipment',
    },
    productType: {
      label: 'smallSelfPropelledMower',
      value: 'smallSelfPropelledMower',
    },
    volume: 0.3,
    weight: 30,
    size: null,
    specification: null,
    price: 70,
  },
  {
    category: {
      label: 'gardenEquipment',
      value: 'gardenEquipment',
    },
    productType: {
      label: 'bigSelfPropelledMower',
      value: 'bigSelfPropelledMower',
    },
    volume: 0.35,
    weight: 40,
    size: null,
    specification: null,
    price: 80,
  },
];

export const shipmentsCategoryProducts: CommonProductTypeExample[] = [
  // Siuntos shipments
  {
    category: {
      label: 'shipments',
      value: 'shipments',
    },
    productType: null,
    size: {
      from: 0,
      to: 4,
    },
    specification: null,
    price: 35,
  },
  {
    category: {
      label: 'shipments',
      value: 'shipments',
    },
    productType: null,
    size: {
      from: 5,
      to: 14,
    },
    specification: null,
    price: 40,
  },
  {
    category: {
      label: 'shipments',
      value: 'shipments',
    },
    productType: null,
    size: {
      from: 15,
      to: 29,
    },
    specification: null,
    price: 45,
  },
  {
    category: {
      label: 'shipments',
      value: 'shipments',
    },
    productType: null,
    size: {
      from: 30,
      to: 34,
    },
    specification: null,
    price: 0, // 1.5 * size(kg)
    surcharge: 10, // %
  },
  {
    category: {
      label: 'shipments',
      value: 'shipments',
    },
    productType: null,
    size: {
      from: 35,
      to: 49,
    },
    specification: null,
    price: 0, // 1.49 * size(kg)
    surcharge: 10, // %
  },
  {
    category: {
      label: 'shipments',
      value: 'shipments',
    },
    productType: null,
    size: {
      from: 50,
      to: 99,
    },
    specification: null,
    price: 0, // 1.46 * size(kg)
    surcharge: 10, // %
  },
  {
    category: {
      label: 'shipments',
      value: 'shipments',
    },
    productType: null,
    size: {
      from: 100,
      to: Infinity,
    },
    specification: null,
    price: 0, // 1.35 * size(kg)
    surcharge: 10, // %
  },
];

export const removalsCategoryProducts: CommonProductTypeExample[] = [
  //Perkraustymai removals
  // Size in m3
  {
    category: {
      label: 'removals',
      value: 'removals',
    },
    productType: null,
    size: {
      from: 0,
      to: 0.99,
    },
    specification: null,
    price: 200,
  },
  {
    category: {
      label: 'removals',
      value: 'removals',
    },
    productType: null,
    size: {
      from: 1,
      to: 2.99,
    },
    specification: null,
    price: 170,
  },
  {
    category: {
      label: 'removals',
      value: 'removals',
    },
    productType: null,
    size: {
      from: 3,
      to: 4.99,
    },
    specification: null,
    price: 150,
  },
  {
    category: {
      label: 'removals',
      value: 'removals',
    },
    productType: null,
    size: {
      from: 5,
      to: 9.99,
    },
    specification: null,
    price: 130,
  },
  {
    category: {
      label: 'removals',
      value: 'removals',
    },
    productType: null,
    size: {
      from: 10,
      to: Infinity,
    },
    specification: null,
    price: 115,
  },
];

export const palettesCategoryProducts: CommonProductTypeExample[] = [
  {
    category: {
      label: 'palettes',
      value: 'palettes',
    },
    productType: null,
    size: null,
    callManager: true,
    volume: 0,
    weight: 0,
    specification: null,
    price: 0,
  },
];

export const allProducts: CommonProductTypeExample[] = [
  ...automotiveGoodsCategoryProducts,
  ...bicyclesAndScootersCategoryProducts,
  ...goodsForChildrenCategoryProducts,
  ...motorcyclesAndAccessoriesCategoryProducts,
  ...flatScreenTvCategoryProducts,
  ...householdAppliancesCategoryProducts,
  ...gardenEquipmentCategoryProducts,
  ...shipmentsCategoryProducts,
  ...removalsCategoryProducts,
  ...palettesCategoryProducts,
];

export const categoriesOptions: OptionType[] = getOptions(
  allProducts.map((product) => product.category)
).sort((a, b) => {
  // @ts-ignore
  if (a.value === 'shipments' || b.value === 'shipments') return -1;
  // @ts-ignore
  return a.label.localeCompare(b.label);
}) as OptionType[];

export const automotiveGoodsCategoryProductTypesOptions: OptionType[] =
  getOptions(
    automotiveGoodsCategoryProducts
      .map((product) => product.productType)
      .filter((obj) => obj !== null) as OptionType[]
  ) as OptionType[];

export const bicyclesAndScootersCategoryProductTypesOptions: OptionType[] =
  getOptions(
    bicyclesAndScootersCategoryProducts
      .map((product) => product.productType)
      .filter((obj) => obj !== null) as OptionType[]
  ) as OptionType[];

export const goodsForChildrenCategoryProductTypesOptions: OptionType[] =
  getOptions(
    goodsForChildrenCategoryProducts
      .map((product) => product.productType)
      .filter((obj) => obj !== null) as OptionType[]
  ) as OptionType[];

export const motorcyclesAndAccessoriesCategoryProductTypesOptions: OptionType[] =
  getOptions(
    motorcyclesAndAccessoriesCategoryProducts
      .map((product) => product.productType)
      .filter((obj) => obj !== null) as OptionType[]
  ) as OptionType[];

export const householdAppliancesCategoryProductTypesOptions: OptionType[] =
  getOptions(
    householdAppliancesCategoryProducts
      .map((product) => product.productType)
      .filter((obj) => obj !== null) as OptionType[]
  ) as OptionType[];

export const gardenEquipmentCategoryProductTypesOptions: OptionType[] =
  getOptions(
    gardenEquipmentCategoryProducts
      .map((product) => product.productType)
      .filter((obj) => obj !== null) as OptionType[]
  ) as OptionType[];

// Size Units x = number
// Radius Rx
// CM3
// Coliai
// KG
// M3

export const getSizeOptionsBySelectedProductType = (
  category?: string,
  productType?: string
) => {
  if (category && productType) {
    const filteredProductsByCategoryAndType = allProducts
      .filter((product) => product.category.value === category)
      .filter((item) => item.productType?.value === productType)
      .map((item) => {
        if (!item.size) return null;
        // @ts-ignore
        if (item.size.to || item.size.from) {
          return {
            label: convertRangeSizeToOptionType(
              // @ts-ignore
              item.size,
              category,
              productType
            ),
            value: convertRangeSizeToOptionType(
              // @ts-ignore
              item.size,
              category,
              productType
            ),
          };
          // @ts-ignore
        } else if (item.size.value || item.size.label) {
          return {
            // @ts-ignore
            label: item.size.label,
            // @ts-ignore
            value: item.size.value,
          };
        }
      });

    return filteredProductsByCategoryAndType.length > 1
      ? getUniqueOptions(
          (filteredProductsByCategoryAndType.filter(
            (item) => !!item
          ) as OptionType[]) ?? []
        )
      : [];
  } else if (category && !productType) {
    const filteredProductsByCategoryAndType = allProducts
      .filter((product) => product.category.value === category)
      .map((item) => {
        if (!item.size) return null;
        // @ts-ignore
        if (item.size.to || item.size.from) {
          return {
            label: convertRangeSizeToOptionType(
              // @ts-ignore
              item.size,
              category,
              productType
            ),
            value: convertRangeSizeToOptionType(
              // @ts-ignore
              item.size,
              category,
              productType
            ),
          };
          // @ts-ignore
        } else if (!!item.size.value || !!item.size.label) {
          return {
            // @ts-ignore
            label: item.size.label,
            // @ts-ignore
            value: item.size.value,
          };
        }
      });
    return filteredProductsByCategoryAndType.length > 1
      ? getUniqueOptions(
          (filteredProductsByCategoryAndType.filter(
            // @ts-ignore
            (item) => !!item || !!item?.value
          ) as OptionType[]) ?? []
        )
      : [];
  }
  return [];
};

export const getSpecificationOptionsBySelectedProduct = (
  category?: string,
  productType?: string
) => {
  if (!category || !productType) return [];

  const filteredByCategoryAndType = allProducts
    .filter((product) => product.category.value === category)
    .filter((item) => item.productType?.value === productType)
    .filter((item) => item.specification !== null)
    .map((item) => item.specification);

  return filteredByCategoryAndType.length > 1
    ? getUniqueOptions(filteredByCategoryAndType as OptionType[])
    : [];
};

const getUniqueOptions = (array: { value: string; label: string }[]) => {
  return array.length > 1
    ? array
        .filter((option) => !!option.value && !!option.value)
        .filter(
          (item, index, self) =>
            index ===
            self.findIndex(
              (t) => t.value === item.value && t.label === item.label
            )
        )
    : [];
};
