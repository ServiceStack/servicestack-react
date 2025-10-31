import { useState } from 'react'
import {
  Alert,
  AlertSuccess,
  PrimaryButton,
  SecondaryButton,
  OutlineButton,
  DarkModeToggle,
  SlideOver,
  ModalDialog,
  DataGrid,
  PreviewFormat,
  Icon,
  Loading,
  ErrorSummary,
  NavList,
  NavListItem,
  Breadcrumbs,
  Breadcrumb,
} from '../index'
import { Icons, bookings, forecasts, tracks } from './data'

export default function App() {
  const [show, setShow] = useState(false)
  const [slideOver, setSlideOver] = useState(false)
  const [modal, setModal] = useState(false)

  const Formats = {
    currency: { method: 'currency' },
    bytes: { method: 'bytes' },
    icon: { method: 'icon' },
    iconRounded: { method: 'iconRounded' },
    attachment: { method: 'attachment' },
    link: { method: 'link' },
    linkMailTo: { method: 'linkMailTo' },
    linkTel: { method: 'linkTel' },
  }

  return (
    <div style={{ marginTop: '60px' }}>
      <div className="absolute top-2 right-2">
        <DarkModeToggle />
      </div>

      <div className="text-center space-x-3 mb-8">
        <SecondaryButton onClick={() => setShow(!show)}>Toggle</SecondaryButton>
        <SecondaryButton onClick={() => setSlideOver(!slideOver)}>Slide Over</SecondaryButton>
        <SecondaryButton onClick={() => setModal(!modal)}>Modal Dialog</SecondaryButton>
      </div>

      {show && (
        <div className="mx-auto max-w-4xl mb-8">
          <Alert type="info">This is a toggled section!</Alert>
        </div>
      )}

      {slideOver && (
        <SlideOver
          title="Slide Over Example"
          onDone={() => setSlideOver(false)}
        >
          <div className="p-4">
            <p>This is a slide over panel!</p>
          </div>
        </SlideOver>
      )}

      {modal && (
        <ModalDialog
          onDone={() => setModal(false)}
        >
          <div className="p-4">
            <h3 className="text-lg font-semibold mb-4">Modal Dialog Example</h3>
            <p>This is a modal dialog!</p>
          </div>
        </ModalDialog>
      )}

      <div className="mx-auto max-w-4xl">
        <h1 className="my-8 text-3xl">Breadcrumbs</h1>
        <Breadcrumbs>
          <Breadcrumb href="/">Home</Breadcrumb>
          <Breadcrumb href="/components">Components</Breadcrumb>
          <Breadcrumb>Current Page</Breadcrumb>
        </Breadcrumbs>
      </div>

      <div className="mx-auto max-w-4xl">
        <h1 className="my-8 text-3xl">Alerts</h1>
        <Alert>Default <b>Message</b></Alert>
        <Alert type="info">Information <b>Message</b></Alert>
        <Alert type="success">Success <b>Message</b></Alert>
        <Alert type="warn">Warning <b>Message</b></Alert>
        <Alert type="error">Error <b>Message</b></Alert>
      </div>

      <div className="mx-auto max-w-4xl">
        <h1 className="my-8 text-3xl">AlertSuccess</h1>
        <AlertSuccess message="Inline Message" />
        <AlertSuccess>Success <b>Message</b></AlertSuccess>
      </div>

      <div className="mx-auto max-w-4xl">
        <h1 className="my-8 text-3xl">Buttons</h1>
        <div className="space-x-2">
          <PrimaryButton href="https://blazor-gallery.servicestack.net">
            Blazor Gallery
          </PrimaryButton>

          <SecondaryButton href="https://docs.servicestack.net/templates-blazor-tailwind">
            Blazor Docs
          </SecondaryButton>

          <OutlineButton>
            Outline Button
          </OutlineButton>
        </div>
      </div>

      <div className="mx-auto max-w-4xl">
        <h1 className="my-8 text-3xl">Button Colors</h1>
        <div className="flex flex-wrap gap-2">
          <PrimaryButton color="blue">Blue</PrimaryButton>
          <PrimaryButton color="purple">Purple</PrimaryButton>
          <PrimaryButton color="red">Red</PrimaryButton>
          <PrimaryButton color="green">Green</PrimaryButton>
          <PrimaryButton color="sky">Sky</PrimaryButton>
          <PrimaryButton color="cyan">Cyan</PrimaryButton>
          <PrimaryButton color="indigo">Indigo</PrimaryButton>
        </div>
      </div>

      <div className="mx-auto max-w-4xl">
        <h1 className="my-8 text-3xl">Loading</h1>
        <Loading />
        <Loading className="text-purple-600 w-8 h-8" />
      </div>

      <div className="mx-auto max-w-4xl">
        <h1 className="my-8 text-3xl">Icons</h1>
        <div className="flex gap-4">
          <Icon svg={Icons.DataGrid} />
          <Icon svg={Icons.AutoQueryGrid} />
          <Icon svg={Icons.AutoForms} />
          <Icon svg={Icons.FormInputs} />
          <Icon svg={Icons.Modals} />
          <Icon svg={Icons.Navigation} />
          <Icon svg={Icons.Alerts} />
          <Icon svg={Icons.Formats} />
          <Icon svg={Icons.Code} />
        </div>
      </div>

      <div className="mx-auto max-w-4xl space-x-2">
        <h1 className="my-8 text-3xl">Data Grids</h1>
        <DataGrid items={bookings} />

        <h3 className="my-4 text-xl">Weather</h3>
        <DataGrid 
          items={forecasts} 
          className="max-w-screen-md" 
          tableStyle={['stripedRows', 'uppercaseHeadings']}
          headerTitles={{ temperatureC: 'TEMP. (C)', temperatureF: 'TEMP. (F)' }}
          visibleFrom={{ date: 'lg' }}
        />

        <h3 className="my-4 text-xl">Responsive Bookings</h3>
        <DataGrid 
          items={bookings}
          visibleFrom={{ name: 'xl', bookingStartDate: 'sm', bookingEndDate: 'xl' }}
        />
      </div>

      <div className="mx-auto max-w-4xl">
        <h1 className="my-8 text-3xl">NavList</h1>
        <NavList title="Explore React Components">
          <NavListItem title="DataGrid" href="/gallery/datagrid" iconSvg={Icons.DataGrid}>
            DataGrid Component Examples for rendering tabular data
          </NavListItem>
          <NavListItem title="AutoQuery Grid" href="/gallery/autoquerygrid" iconSvg={Icons.AutoQueryGrid}>
            Instant customizable UIs for calling AutoQuery CRUD APIs
          </NavListItem>
        </NavList>

        <h2 className="mt-8 text-base font-semibold text-gray-500 dark:text-gray-400 flex">
          <span title="Requires Auth">
            <Icon className="h-6 w-6 mr-2" svg={Icons.Padlock} />
          </span>
          Booking APIs
        </h2>
        <NavList>
          <NavListItem title="Bookings" href="/grid/bookings" iconSvg={Icons.Booking}>
            Create and manage Bookings
          </NavListItem>
          <NavListItem title="Coupons" href="/grid/coupons" iconSvg={Icons.Coupon}>
            Create and manage discount Coupons
          </NavListItem>
        </NavList>
      </div>

      <div className="mx-auto max-w-4xl space-x-2">
        <h1 className="my-8 text-3xl">Table Styles</h1>

        <h3 className="my-4 text-lg font-semibold">Default (Striped Rows)</h3>
        <DataGrid items={tracks} />

        <h3 className="my-4 text-lg font-semibold">Simple</h3>
        <DataGrid items={tracks} tableStyle="simple" />

        <h3 className="my-4 text-lg font-semibold">Uppercase Headings</h3>
        <DataGrid items={tracks} tableStyle="uppercaseHeadings" />

        <h3 className="my-4 text-lg font-semibold">Vertical Lines</h3>
        <DataGrid items={tracks} tableStyle="verticalLines" />

        <h3 className="my-4 text-lg font-semibold">White Background</h3>
        <DataGrid items={tracks} tableStyle="whiteBackground" />

        <h3 className="my-4 text-lg font-semibold">Full Width</h3>
        <DataGrid items={tracks} tableStyle="fullWidth" />
      </div>

      <div className="mx-auto max-w-4xl space-x-2">
        <h1 className="my-8 text-3xl">Preview Formats</h1>
        <div>
          <h3 className="my-4 text-lg font-semibold">Currency</h3>
          <PreviewFormat value={50} format={Formats.currency} />
          <p className="text-lg"><PreviewFormat value={50} format={Formats.currency} /></p>

          <h3 className="my-4 text-lg font-semibold">Bytes</h3>
          <PreviewFormat value={1000000} format={Formats.bytes} />

          <h3 className="my-4 text-lg font-semibold">Link</h3>
          <PreviewFormat value="https://servicestack.net" format={Formats.link} />

          <h3 className="my-4 text-lg font-semibold">Link with styling</h3>
          <div className="text-xl text-green-700 font-semibold">
            <PreviewFormat
              value="https://servicestack.net/blazor"
              format={Formats.link}
            />
          </div>

          <h3 className="my-4 text-lg font-semibold">Link Email</h3>
          <PreviewFormat value="user@email.com" format={Formats.linkMailTo} />

          <h3 className="my-4 text-lg font-semibold">Link Phone</h3>
          <PreviewFormat value="555 123 4567" format={Formats.linkTel} />
        </div>
      </div>

      <div className="mx-auto max-w-4xl mb-8">
        <h1 className="my-8 text-3xl">Error Summary</h1>
        <ErrorSummary 
          status={{
            errorCode: 'ValidationError',
            message: 'There were validation errors',
            errors: [
              { fieldName: 'email', message: 'Email is required' },
              { fieldName: 'password', message: 'Password must be at least 8 characters' }
            ]
          }}
        />
      </div>
    </div>
  )
}

