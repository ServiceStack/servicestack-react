import React, { useState } from 'react'
import { DarkModeToggle } from '../components/DarkModeToggle'
import SecondaryButton from '../components/SecondaryButton'
import TextInput from '../components/TextInput'
import TextareaInput from '../components/TextareaInput'
import SelectInput from '../components/SelectInput'
import CheckboxInput from '../components/CheckboxInput'
import TagInput from '../components/TagInput'
import FileInput from '../components/FileInput'
import MarkdownInput from '../components/MarkdownInput'
import DynamicInput from '../components/DynamicInput'
import ModalDialog from '../components/ModalDialog'
import SlideOver from '../components/SlideOver'
import DataGrid from '../components/DataGrid'
import { tracks, RoomType } from './data'

class Forecast {
  public date?: string;
  public temperatureC?: number;
  public summary?: string;
  public temperatureF?: number;

  public constructor(init?: Partial<Forecast>) { (Object as any).assign(this, init); }
}

export default function App() {
  const [show, setShow] = useState(false)
  const [slideOver, setSlideOver] = useState(false)
  const [modal, setModal] = useState(false)

  const [dates, setDates] = useState({
    isoDate7Z: '2024-01-15T10:30:00.0000000Z',
    isoDate3Z: '2024-01-15T10:30:00.000Z',
    isoDateZ: '2024-01-15T10:30:00Z',
    isoDate: '2024-01-15T10:30:00',
    isoDateOnly: '2024-01-15'
  })

  const [modelDateTimes, setModelDateTimes] = useState({})
  const [modelDates, setModelDates] = useState({})

  // Form inputs state
  const [formInputs, setFormInputs] = useState({
    textInput: 'Sample text',
    emailInput: 'user@example.com',
    numberInput: 42,
    textareaInput: 'This is a multi-line\ntext area input',
    selectInput: RoomType.Queen,
    checkboxInput: true,
    tagInput: ['React', 'TypeScript', 'Tailwind'],
    markdownInput: '# Hello World\n\nThis is **markdown** content with *formatting*.',
    fileInput: []
  })

  const dynamicDateTimes = [
    { id: 'isoDate7Z', type: 'datetime-local' },
    { id: 'isoDate3Z', type: 'datetime-local' },
    { id: 'isoDateZ', type: 'datetime-local' }
  ]

  const dynamicDates = [
    { id: 'isoDate', type: 'date' },
    { id: 'isoDateOnly', type: 'date' }
  ]

  const forecasts = [
    {
      "date": "2025-11-08",
      "temperatureC": 26,
      "summary": "Scorching",
      "temperatureF": 78
    },
    {
      "date": "2025-11-09",
      "temperatureC": 8,
      "summary": "Sweltering",
      "temperatureF": 46
    },
    {
      "date": "2025-11-10",
      "temperatureC": -14,
      "summary": "Warm",
      "temperatureF": 7
    },
    {
      "date": "2025-11-11",
      "temperatureC": 20,
      "summary": "Mild",
      "temperatureF": 67
    },
    {
      "date": "2025-11-12",
      "temperatureC": 53,
      "summary": "Cool",
      "temperatureF": 127
    }
  ]

  const api = null

  return (
    <>
      <div className="absolute top-2 right-2">
        <DarkModeToggle />
      </div>

      <div className="text-center space-x-3">
        <SecondaryButton onClick={() => setShow(!show)}>Toggle</SecondaryButton>
        <SecondaryButton onClick={() => setSlideOver(!slideOver)}>Slide Over</SecondaryButton>
        <SecondaryButton onClick={() => setModal(!modal)}>Modal Dialog</SecondaryButton>
      </div>

      <div className="mt-8 mx-auto max-w-4xl flex flex-col gap-y-4">
        <h2 className="text-2xl font-bold text-gray-900 dark:text-gray-100">DataGrid Example</h2>
        <DataGrid items={tracks} />
      </div>

      <div>
        <h2 className="text-2xl font-bold text-gray-900 dark:text-gray-100">Custom DataGrid</h2>
        <DataGrid
          items={forecasts}
          className="max-w-screen-md"
          tableStyle={['stripedRows', 'uppercaseHeadings']}
          headerTitles={{
            temperatureC: 'TEMP. (C)',
            temperatureF: 'TEMP. (F)'
          }}
          slots={{
            'date-header': () => (
              <span className="text-green-600">Date</span>
            ),
            'date': ({ date }: Forecast) => (
              <>{date ? new Intl.DateTimeFormat().format(new Date(date)) : ''}</>
            ),
            'temperatureC': ({ temperatureC }: Forecast) => (
              <>{temperatureC}&deg;</>
            ),
            'temperatureF': ({ temperatureF }: Forecast) => (
              <>{temperatureF}&deg;</>
            ),
            'summary': ({ summary }: Forecast) => (
              <>{summary}</>
            )
          }}
        />
      </div>

      <div className="mt-8 mx-auto max-w-4xl flex flex-col gap-y-4">
        <h3>date</h3>
        <div className="grid grid-cols-6 gap-6">
          <TextInput
            className="col-span-2"
            type="date"
            id="isoDate7Z"
            value={dates.isoDate7Z}
            onChange={(value) => setDates({ ...dates, isoDate7Z: value as string })}
            label={dates.isoDate7Z}
          />
          <TextInput
            className="col-span-2"
            type="date"
            id="isoDate3Z"
            value={dates.isoDate3Z}
            onChange={(value) => setDates({ ...dates, isoDate3Z: value as string })}
            label={dates.isoDate3Z}
          />
          <TextInput
            className="col-span-2"
            type="date"
            id="isoDateZ"
            value={dates.isoDateZ}
            onChange={(value) => setDates({ ...dates, isoDateZ: value as string })}
            label={dates.isoDateZ}
          />
        </div>

        <h3>datetime-local</h3>
        <div className="grid grid-cols-6 gap-6">
          <TextInput
            className="col-span-2"
            type="datetime-local"
            id="isoDate7Z-dt"
            value={dates.isoDate7Z}
            onChange={(value) => setDates({ ...dates, isoDate7Z: value as string })}
            label={dates.isoDate7Z}
          />
          <TextInput
            className="col-span-2"
            type="datetime-local"
            id="isoDate3Z-dt"
            value={dates.isoDate3Z}
            onChange={(value) => setDates({ ...dates, isoDate3Z: value as string })}
            label={dates.isoDate3Z}
          />
        </div>

        <h3>Dynamic DateTimes</h3>
        <div className="grid grid-cols-6 gap-6">
          {dynamicDateTimes.map(f => (
            <div key={f.id} className="col-span-2">
              <DynamicInput
                input={f}
                value={modelDateTimes}
                onChange={setModelDateTimes}
                api={api}
              />
              <div>{modelDateTimes[f.id]}</div>
            </div>
          ))}
        </div>
        <div>
          <pre>{JSON.stringify(modelDateTimes, null, 2)}</pre>
        </div>

        <h3>Dynamic Dates</h3>
        <div className="grid grid-cols-6 gap-6">
          {dynamicDates.map(f => (
            <div key={f.id} className="col-span-2">
              <DynamicInput
                input={f}
                value={modelDates}
                onChange={setModelDates}
                api={api}
              />
              <div>{modelDates[f.id]}</div>
            </div>
          ))}
        </div>
        <div>
          <pre>{JSON.stringify(modelDates, null, 2)}</pre>
        </div>

        {show && (
          <div className="p-4 bg-blue-100 dark:bg-blue-900 rounded">
            Content is visible!
          </div>
        )}
      </div>

      {/* Form Inputs Section */}
      <div className="mt-8 mx-auto max-w-4xl flex flex-col gap-y-4 pb-8">
        <h2 className="text-2xl font-bold text-gray-900 dark:text-gray-100">Form Input Components</h2>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {/* TextInput - Text */}
          <TextInput
            id="textInput"
            label="Text Input"
            placeholder="Enter some text"
            value={formInputs.textInput}
            onChange={(value) => setFormInputs({ ...formInputs, textInput: value as string })}
          />

          {/* TextInput - Email */}
          <TextInput
            id="emailInput"
            type="email"
            label="Email Input"
            placeholder="user@example.com"
            value={formInputs.emailInput}
            onChange={(value) => setFormInputs({ ...formInputs, emailInput: value as string })}
          />

          {/* TextInput - Number */}
          <TextInput
            id="numberInput"
            type="number"
            label="Number Input"
            placeholder="Enter a number"
            value={formInputs.numberInput}
            onChange={(value) => setFormInputs({ ...formInputs, numberInput: value as number })}
          />

          {/* SelectInput */}
          <SelectInput
            id="selectInput"
            label="Select Input"
            value={formInputs.selectInput}
            values={Object.values(RoomType)}
            onChange={(value) => setFormInputs({ ...formInputs, selectInput: value as RoomType })}
          />
        </div>

        {/* TextareaInput */}
        <TextareaInput
          id="textareaInput"
          label="Textarea Input"
          placeholder="Enter multiple lines of text"
          value={formInputs.textareaInput}
          onChange={(value) => setFormInputs({ ...formInputs, textareaInput: value as string })}
        />

        {/* CheckboxInput */}
        <CheckboxInput
          id="checkboxInput"
          label="Checkbox Input"
          help="Check or uncheck this option"
          value={formInputs.checkboxInput}
          onChange={(value) => setFormInputs({ ...formInputs, checkboxInput: value as boolean })}
        />

        {/* TagInput */}
        <TagInput
          id="tagInput"
          label="Tag Input"
          help="Type and press comma or enter to add tags"
          value={formInputs.tagInput}
          allowableValues={['React', 'Vue', 'Angular', 'Svelte', 'TypeScript', 'JavaScript', 'Tailwind', 'Bootstrap']}
          onChange={(value: any) => setFormInputs({ ...formInputs, tagInput: value as string[] })}
        />

        {/* MarkdownInput */}
        <MarkdownInput
          id="markdownInput"
          label="Markdown Input"
          help="Enter markdown formatted text"
          value={formInputs.markdownInput}
          onChange={(value: any) => setFormInputs({ ...formInputs, markdownInput: value as string })}
        />

        {/* FileInput */}
        <FileInput
          id="fileInput"
          label="File Input"
          help="Upload one or more files"
          multiple
          files={formInputs.fileInput}
          onChange={(files: any) => setFormInputs({ ...formInputs, fileInput: files })}
        />

        {/* Display current values */}
        <div className="mt-4">
          <h3 className="text-lg font-semibold text-gray-900 dark:text-gray-100 mb-2">Current Values:</h3>
          <pre className="p-4 bg-gray-100 dark:bg-gray-800 rounded text-sm overflow-auto">
            {JSON.stringify(formInputs, null, 2)}
          </pre>
        </div>
      </div>

      {slideOver && (
        <SlideOver title="Demo Slide Over" onDone={() => setSlideOver(false)}>
          <div className="p-4">
            <p>This is a slide over panel</p>
          </div>
        </SlideOver>
      )}

      {modal && (
        <ModalDialog onDone={() => setModal(false)}>
          <div className="p-4">
            <h2 className="text-lg font-semibold mb-4">Modal Dialog</h2>
            <p>This is a modal dialog</p>
          </div>
        </ModalDialog>
      )}
    </>
  )
}
