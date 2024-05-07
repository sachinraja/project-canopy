'use client'

import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select'
import { atom, useAtom } from 'jotai'

export type PricingModel = 'base'
export const pricingModelAtom = atom<PricingModel>('base')

export function PricingModelSelect() {
  const [pricingModel, setPricingModel] = useAtom(pricingModelAtom)
  return (
    <Select
      defaultValue={pricingModel}
      onValueChange={(value) => setPricingModel(value as PricingModel)}
    >
      <SelectTrigger className="w-[180px]">
        <SelectValue placeholder="Select a model" />
      </SelectTrigger>
      <SelectContent>
        <SelectItem value="base">Base</SelectItem>
      </SelectContent>
    </Select>
  )
}
