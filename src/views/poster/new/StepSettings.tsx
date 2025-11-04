import React from 'react'

import { getPosterPresets } from '@api/poster'
import { ActionButton } from '@components/custom/button'
import { ImagePreview } from '@components/custom/viewer'
import { Button } from '@components/ui/button'
import { Checkbox } from '@components/ui/checkbox'
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@components/ui/select'
import { Switch } from '@components/ui/switch'
import { usePosterForm } from '@hooks/usePosterForm'
import { snakeToCamel } from '@lib/fn'
import { cn } from '@lib/utils'
import type { WizardStepProps } from '@ts/wizardStep'
import groupBy from 'lodash/groupBy'
import mapValues from 'lodash/mapValues'
import startCase from 'lodash/startCase'
import { ArrowLeft, ArrowRight, CircleMinus } from 'lucide-react'
import { useWatch } from 'react-hook-form'

const LANGUAGES = [
  { label: 'English', value: 'en' },
  { label: 'Arabic', value: 'ar' },
]

const ORIENTATIONS = ['horizontal', 'vertical', 'square'] as const

const FONTS = [
  { label: 'Effra Thin', weight: 300, key: 'effraThin' },
  { label: 'Effra Regular', weight: 400, key: 'effraRegular' },
  { label: 'Effra Bold', weight: 700, key: 'effraBold' },
]

const IMAGES_ICONS = [
  { label: 'CTA Pattern Icon', description: 'Call-to-action pattern', key: 'ctaPattern' },
  { label: 'Logo Bottom Left', description: 'Logo placement bottom left', key: 'logoBottomLeft' },
  { label: 'Logo Top Left', description: 'Logo placement top left', key: 'logoTopLeft' },
  { label: 'Logo Top Right', description: 'Text Background Shape', key: 'logoTopRight' },
  {
    label: 'Text Background Shape',
    description: 'Background shape for text',
    key: 'textBackgroundShape',
  },
]

export const StepSettings = (props?: WizardStepProps) => {
  const { onNext, onPrev } = props || {}
  const { setValue, control } = usePosterForm()

  const {
    language,
    orientation,
    size,
    productPosition,
    backgroundColor,
    minimalPadding,
    image: imageFile,
  } = useWatch({ control })

  const [selectedFonts, setSelectedFonts] = React.useState<Array<string>>([])
  const [selectedAssets, setSelectedAssets] = React.useState<Array<string>>([])

  // Handler toggle all fonts
  const handleToggleAllFonts = (checked: boolean) => {
    if (checked) setSelectedFonts(FONTS.map((f) => f.key))
    else setSelectedFonts([])
  }
  // Handler toggle font
  const handleToggleFont = (key: string, checked: boolean) => {
    setSelectedFonts((prev) => (checked ? [...prev, key] : prev.filter((k) => k !== key)))
  }

  // Handler toggle all assets
  const handleToggleAllAssets = (checked: boolean) => {
    if (checked) setSelectedAssets(IMAGES_ICONS.map((a) => a.key))
    else setSelectedAssets([])
  }
  // Handler toggle asset
  const handleToggleAsset = (key: string, checked: boolean) => {
    setSelectedAssets((prev) => (checked ? [...prev, key] : prev.filter((k) => k !== key)))
  }

  const posterPresetsQuery = getPosterPresets()
  const posterPresets = posterPresetsQuery.data
  // GET SIZE
  const sizeData = posterPresets?.sizes || {}
  const grouped = groupBy(sizeData, 'orientation')
  const formattedSizes: object | undefined = mapValues(grouped, (items) =>
    items.map((item) => ({
      value: item?.key,
      label: `${startCase(item?.type)} (${item?.dimensions?.width} x ${item?.dimensions?.height})`,
      dimensions: item?.dimensions,
    }))
  )
  const sizes = formattedSizes[orientation || 0] || []
  const dimension = sizes?.find(({ value }) => value === size)?.dimensions
  const ratio: number = parseFloat(((dimension?.width || 1) / (dimension?.height || 1)).toFixed(1))

  // GET POSITIONS
  const positions = posterPresets?.positions || []

  // GET POSITIONS
  const backgroundColors = posterPresets?.backgroundColors || []

  return (
    <>
      <div className='md:w-3/4 xl:w-4/5 mx-auto'>
        <div className='flex flex-wrap gap-6 pt-4 w-full'>
          {/* Left form */}
          <div className='w-1/2 space-y-6'>
            {/* Language */}
            <div className='mb-4'>
              <div className='font-semibold mb-1 text-sm'>Language</div>
              <Select
                defaultValue={LANGUAGES[0].value}
                value={language}
                onValueChange={(e) =>
                  setValue('language', e, { shouldValidate: true, shouldDirty: true })
                }>
                <SelectTrigger className='w-full'>
                  <SelectValue placeholder='Language' />
                </SelectTrigger>
                <SelectContent>
                  {LANGUAGES.map(({ label, value }) => (
                    <SelectItem key={value} value={value}>
                      {label}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>
            {/* Orientation */}
            <div className='mb-4'>
              <div className='font-semibold mb-1 text-sm'>Orientation</div>
              <div className='flex space-x-2'>
                {ORIENTATIONS.map((o) => (
                  <button
                    key={o}
                    type='button'
                    onClick={() => {
                      setValue('orientation', o)
                      setTimeout(() => {
                        setValue('size', formattedSizes[o]?.[0]?.value, {
                          shouldValidate: true,
                          shouldDirty: true,
                        })
                      }, 100)
                    }}
                    className={cn(
                      'px-4 py-1 rounded-[7px] border text-[11pt]',
                      orientation === o ? 'border-gray-500 bg-gray-100/50' : 'border-gray-200'
                    )}>
                    {o.charAt(0).toUpperCase() + o.slice(1)}
                  </button>
                ))}
              </div>
            </div>
            {/* Size */}
            <div className='mb-4'>
              <div className='font-semibold mb-1 text-sm'>Size</div>
              <Select
                defaultValue={sizes?.[0]?.value}
                value={size}
                onValueChange={(e) =>
                  setValue('size', e, { shouldValidate: true, shouldDirty: true })
                }>
                <SelectTrigger className='w-full'>
                  <SelectValue placeholder='Size' />
                </SelectTrigger>
                <SelectContent>
                  {sizes.map(({ label, value }) => (
                    <SelectItem key={value} value={value}>
                      {label}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>
            <div className='flex gap-5'>
              {/* Product Position */}
              <div>
                <div className='font-semibold mb-1 text-sm'>Product Position</div>
                <div className='grid grid-cols-3 gap-1 w-36'>
                  {[
                    { value: 'top_left', disabled: true },
                    { value: 'top', disabled: false },
                    { value: 'top_right', disabled: true },
                    { value: 'left', disabled: false },
                    { value: 'center', disabled: false },
                    { value: 'right', disabled: false },
                    { value: 'bottom_left', disabled: true },
                    { value: 'bottom', disabled: false },
                    { value: 'bottom_right', disabled: true },
                  ].map(({ value, disabled }, i) => {
                    const val = positions?.find((f) => f === value)
                    return (
                      <button
                        key={i}
                        disabled={disabled}
                        type='button'
                        onClick={() => setValue('productPosition', val)}
                        className={cn(
                          'border rounded h-5 flex items-center justify-center',
                          productPosition === val
                            ? 'border-gray-500 bg-gray-100'
                            : 'border-gray-200'
                        )}>
                        {disabled && <CircleMinus className='h-3 text-gray-300' />}
                      </button>
                    )
                  })}
                </div>
              </div>
              {/* Background Color */}
              <div>
                <div className='font-semibold mb-1 text-sm'>Background Color</div>
                <div className='flex flex-wrap gap-1'>
                  {backgroundColors?.map((bg) => (
                    <button
                      key={bg}
                      type='button'
                      onClick={() => setValue('backgroundColor', bg)}
                      style={{ backgroundColor: snakeToCamel(bg) }}
                      className={`h-5 w-5 rounded-[6px] border ${backgroundColor === bg ? 'border-black' : 'border-gray-300'}`}
                    />
                  ))}
                </div>
              </div>
            </div>
            {/* Smart Minimal Padding */}
            <label className='flex items-center justify-between bg-gray-100/50 border border-gray-200 rounded-[7px] p-3'>
              <div className='text-sm font-medium'>Smart Minimal Padding</div>
              <Switch
                defaultChecked={minimalPadding}
                onCheckedChange={(e) => setValue('minimalPadding', e)}
              />
            </label>
            {/* Fonts */}
            <div>
              <div className='font-semibold mb-1'>Fonts</div>
              <p className='text-xs text-gray-400 mb-1'>
                Select fonts to include in your poster design. Selected fonts will be available to
                the AI.
              </p>
              <div className='flex flex-col gap-[5px] mt-2'>
                <label className='flex items-center space-x-3 cursor-pointer border border-gray-200/75 rounded-[7px] px-2 py-2 text-sm'>
                  <Checkbox
                    checked={selectedFonts.length === FONTS.length}
                    onCheckedChange={(e: boolean) => handleToggleAllFonts(e)}
                  />
                  <div>Select All</div>
                </label>

                {FONTS.map(({ label, weight, key }) => (
                  <label
                    key={key}
                    className='flex items-center space-x-3 cursor-pointer border border-gray-200/75 rounded-[7px] px-2 py-2 text-sm'>
                    <Checkbox
                      checked={selectedFonts.includes(key)}
                      onCheckedChange={(e: boolean) => handleToggleFont(key, e)}
                    />
                    <div className=''>
                      <div>{label}</div>
                      <div className='text-xs text-muted-foreground'>{weight} weight</div>
                    </div>
                  </label>
                ))}
              </div>
            </div>
            {/* Images & Icons */}
            <div>
              <div className='font-semibold mb-1'>Images & Icons</div>
              <p className='text-xs text-gray-400 mb-1'>
                Select images and icons to include in your poster design. Selected assets will be
                available to the AI.
              </p>
              <div className='flex flex-col gap-[5px] mt-2'>
                <label className='flex items-center space-x-3 cursor-pointer border border-gray-200/75 rounded-[7px] px-2 py-2 text-sm'>
                  <Checkbox
                    checked={selectedAssets.length === IMAGES_ICONS.length}
                    onCheckedChange={(e: boolean) => handleToggleAllAssets(e)}
                  />
                  <div>Select All</div>
                </label>

                {IMAGES_ICONS.map(({ label, description, key }) => (
                  <label
                    key={key}
                    className='flex items-center space-x-3 cursor-pointer border border-gray-200/75 rounded-[7px] px-2 py-2 text-sm'>
                    <Checkbox
                      checked={selectedAssets.includes(key)}
                      onCheckedChange={(e: boolean) => handleToggleAsset(key, e)}
                    />
                    <div className=''>
                      <div>{label}</div>
                      <div className='text-xs text-muted-foreground'>{description} weight</div>
                    </div>
                  </label>
                ))}
              </div>
            </div>
          </div>

          {/* Right Preview */}
          <div className='flex-1 h-min bg-gray-50 rounded-lg p-4 sticky top-5'>
            <div className='font-semibold mb-1'>Preview</div>
            <div
              className={cn(
                'p-4 bg-white rounded-xl shadow-lg mt-10 md:w-4/5 xl:w-3/4 mx-auto overflow-hidden',
                `aspect-[${ratio}]`
              )}
              style={{ backgroundColor: snakeToCamel(backgroundColor) }}>
              <div className='w-1/2'>
                <div className='text-sm bg-gray-50 flex justify-center border border-gray-100 py-[7px] rounded-[7px] text-gray-500'>
                  Logo
                </div>
                <div className='mt-2 aspect-square'>
                  <ImagePreview file={imageFile} fill='cover' />
                </div>
              </div>
              <div className='mt-10 mb-4'>
                <div className='font-semibold text-sm'>Lorem Ipsum</div>
                <div className='text-xs'>
                  Lorem ipsum dolor sit amet, consectetur adipisicing elit. Deserunt mollitia iure a
                  fugit aut labore.
                </div>
              </div>
              <div className='w-1/2'>
                <div className='text-sm bg-gray-50 flex justify-center border border-gray-100 py-[7px] rounded-[7px] text-gray-500'>
                  CTA Button
                </div>
              </div>
            </div>
            <div className='mt-2 mb-10'>
              <div className='flex justify-center text-xs text-gray-600 gap-3'>
                <div className='text-center capitalize'>{orientation}</div>
                <div className='text-center capitalize'>
                  {dimension?.width} x {dimension?.height}
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
      <div className='sticky bottom-0 lg:w-11/12 mx-auto bg-white p-5 rounded-t-xl mt-10'>
        <div className='flex items-center justify-between'>
          <Button variant='outline' onClick={onPrev}>
            <ArrowLeft size={20} />
            <span>Previous</span>
          </Button>
          <ActionButton onClick={onNext}>
            <span className='mr-2'>Generate</span>
            <ArrowRight size={20} />
          </ActionButton>
        </div>
      </div>
    </>
  )
}
