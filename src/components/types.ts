// React Component Type Definitions
import type { ReactNode, CSSProperties } from 'react'
import type { Apis } from '../use/metadata'
import type {
  ResponseStatus, MetadataOperationType, InputProp, TableStyleOptions, Breakpoint, ApiRequest, MetadataType,
  InputInfo, AutoQueryConvention, ApiPrefs, GridAllowOptions, GridShowOptions, MetadataPropertyType,
  ApiResponseType, UploadedFile, ImageInfo, MarkdownInputOptions, RefInfo, FormatInfo, Column, AuthenticateResponse,
  ColumnSettings
} from '@/types'

// Input Components
export interface TextInputProps {
  status?: ResponseStatus|null
  id: string
  type?: string
  inputClass?: string
  filterClass?:(cls:string) => string
  label?: string
  labelClass?: string
  help?: string
  placeholder?: string
  value?: string|number
  onChange?: (value:string|number) => void
}
export interface TextInputRef {
  focus(): void
}

export interface TextareaInputProps {
  status?: ResponseStatus|null
  id: string
  inputClass?: string
  filterClass?:(cls:string) => string
  label?: string
  labelClass?: string
  help?: string
  placeholder?: string
  value?: string
  onChange?: (value:string) => void
}

export interface SelectInputProps {
  status?: ResponseStatus
  id: string
  value?: string
  inputClass?: string
  filterClass?:(cls:string) => string
  label?: string
  labelClass?: string
  options?: any
  values?: string[]
  entries?: { key:string, value:string }[]
  onChange?: (value:string) => void
}

export interface CheckboxInputProps {
  value?: boolean
  status?: ResponseStatus
  id: string
  inputClass?: string
  filterClass?:(cls:string) => string
  label?: string
  labelClass?: string
  help?: string
  onChange?: (value:boolean) => void
}

export interface FileInputProps {
  multiple?: boolean
  status?: ResponseStatus|null
  id: string
  inputClass?: string
  filterClass?:(cls:string) => string
  label?: string
  labelClass?: string
  help?: string
  placeholder?: string
  value?: string
  values?:string[]
  files?:UploadedFile[]
  onChange?: (value:string) => void
}

// Button Components
export interface PrimaryButtonProps {
  type?: "submit" | "button" | "reset"
  href?: string
  color?: "blue" | "purple" | "red" | "green" | "sky" | "cyan" | "indigo"
  onClick?: () => void
  children?: ReactNode
  className?: string
  disabled?: boolean
}

export interface SecondaryButtonProps {
  type?: "submit" | "button" | "reset"
  href?: string
  onClick?: () => void
  children?: ReactNode
  className?: string
  disabled?: boolean
}

export interface OutlineButtonProps {
  type?: "submit" | "button" | "reset"
  href?: string
  onClick?: () => void
  children?: ReactNode
  className?: string
  disabled?: boolean
}

// Form Components
export interface AutoFormProps {
    type: string|InstanceType<any>|Function
    value?: ApiRequest|any
    heading?: string
    subHeading?: string
    showLoading?: boolean
    jsconfig?: string
    formStyle?: "slideOver" | "card"
    metaType?: MetadataType
    configureField?: (field:InputProp) => void
    configureFormLayout?: (field:InputProp[]) => void

    panelClass?: string
    bodyClass?: string
    formClass?: string
    innerFormClass?: string
    headerClass?: string
    buttonsClass?: string
    headingClass?: string
    subHeadingClass?: string
    submitLabel?: string
    allowSubmit?: (model:any) => boolean

    onSuccess?: (response:any) => void
    onError?: (error:ResponseStatus) => void
    onDone?: () => void
    onChange?: (value:any) => void
}

export interface AutoFormBaseProps {
  type: string|InstanceType<any>|Function
  formStyle?: "slideOver" | "card"
  panelClass?: string
  formClass?: string
  headingClass?: string
  subHeadingClass?: string
  buttonsClass?: string,
  heading?: string
  subHeading?: string
  autosave?: boolean
  showLoading?: boolean,
  showCancel?: boolean
  configureField?: (field:InputProp) => void
  configureFormLayout?: (field:InputProp[]) => void
  onDone?: () => void
  onSave?: (response:any) => void
  onError?: (error:ResponseStatus) => void
}

export interface AutoCreateFormProps extends AutoFormBaseProps {
  // Inherits all AutoFormProps
}

export interface AutoEditFormProps extends AutoFormBaseProps {
  value: any
  deleteType?: string|InstanceType<any>|Function
  onDelete?: (response:any) => void
}

export interface AutoViewFormProps {
  model: any
  apis?: Apis,
  typeName?: string,
  done?: Function,
  formStyle?: "slideOver" | "card"
  panelClass?: string
  formClass?: string
  headingClass?: string
  subHeadingClass?: string
  heading?: string
  subHeading?: string
  showLoading?: boolean
  deleteType?: string|InstanceType<any>|Function
  onDone?: () => void
  onSave?: (response:any) => void
  onDelete?: (response:any) => void
  onError?: (error:ResponseStatus) => void
}

// Additional Input Components
export interface TagInputProps {
  status?: ResponseStatus|null
  id: string
  type?: string
  inputClass?: string
  filterClass?:(cls:string) => string
  label?: string
  labelClass?: string
  help?: string
  value?: string|string[]
  delimiters?: string[]
  allowableValues?: string[]
  string?: boolean
  maxVisibleItems?: number
  converter?: (value:any) => string|string[]
  onChange?: (value:string|string[]) => void
}

export interface AutocompleteProps {
  status?: ResponseStatus|null
  id: string
  type?: string
  label?: string
  help?: string
  placeholder?: string
  multiple?: boolean
  required?: boolean
  options?: any[]
  value?: any
  match:(item:any,value:string) => boolean
  viewCount?: number
  pageSize?: number
  onChange?: (value:any[]|any) => void
  children?: ((item:any) => ReactNode) | ReactNode
}

export interface ComboboxProps {
    id: string
    value?: any,
    multiple?: boolean,
    options?: any
    values?: string[]
    entries?: { key:string, value:string }[],
    onChange?: (value:any[]|any) => void
    children?: ((item:any) => ReactNode) | ReactNode
}

export interface ComboboxRef {
  toggle(expand:boolean): void
}

export interface DynamicInputProps {
  input: InputProp|InputInfo
  value: ApiRequest
  api: ApiResponseType|null
  onChange?: (value:any) => void
}

export interface LookupInputProps {
  id?: string
  status?: ResponseStatus|null
  input: InputProp|InputInfo
  metadataType: MetadataType
  value: any
  label?: string
  labelClass?: string
  help?: string
  onChange?: (value:any) => void
}

// Grid Components
export interface DataGridProps {
    items: any[]
    id?: string
    type?: string|InstanceType<any>|Function
    tableStyle?: TableStyleOptions
    selectedColumns?:string[]|string
    className?: string
    gridClass?: string
    grid2Class?: string
    grid3Class?: string
    grid4Class?: string
    tableClass?: string
    theadClass?: string
    tbodyClass?: string
    theadRowClass?: string
    theadCellClass?: string
    isSelected?:(row:any) => boolean
    headerTitle?:(name:string) => string
    headerTitles?: {[name:string]:string}
    visibleFrom?: {[name:string]:Breakpoint|"never"}
    rowClass?:(model:any,i:number) => string
    rowStyle?:(model:any,i:number) => CSSProperties | undefined
    onHeaderSelected?: (name:string, ev:React.MouseEvent) => void
    onRowSelected?: (item:any, ev:React.MouseEvent) => void
    slots?: {[name:string]: React.ReactNode | ((props:any) => React.ReactNode)}
}

export interface AutoQueryGridProps {
    filterDefinitions?: AutoQueryConvention[]
    id?: string
    apis?: string|string[]
    type?: string|InstanceType<any>|Function
    prefs?: ApiPrefs

    deny?: string|GridAllowOptions|GridAllowOptions[]
    hide?: string|GridShowOptions|GridShowOptions[]

    selectedColumns?:string[]|string
    toolbarButtonClass?: string
    tableStyle?: TableStyleOptions
    gridClass?: string
    grid2Class?: string
    grid3Class?: string
    grid4Class?: string
    tableClass?: string
    theadClass?: string
    tbodyClass?: string
    theadRowClass?: string
    theadCellClass?: string

    headerTitle?:(name:string) => string
    headerTitles?: {[name:string]:string}
    visibleFrom?: {[name:string]:Breakpoint|"never"}
    rowClass?:(model:any,i:number) => string
    rowStyle?:(model:any,i:number) => CSSProperties | undefined
    modelTitle?: string
    newButtonLabel?: string

    apiPrefs?: ApiPrefs
    canFilter?:(column:string) => boolean
    disableKeyBindings?:(column:string) => boolean
    configureField?: (field:InputProp) => void
    skip?: number
    create?: boolean
    edit?: string|number
    filters?: any

    onHeaderSelected?: (name:string, ev:React.MouseEvent) => void
    onRowSelected?: (item:any, ev:React.MouseEvent) => void
    onNav?: (args:any) => void
}

// Modal Components
export interface ModalDialogProps {
  id?: string
  modalClass?: string
  sizeClass?: string
  closeButtonClass?: string
  configureField?: (field:InputProp) => void
  children?: ReactNode
  onDone?: () => void
}

export interface SlideOverProps {
  id?: string
  title?: string
  subtitle?: string
  contentClass?: string
  children?: ReactNode
  onDone?: () => void
}

// Navigation Components
export interface BreadcrumbsProps {
  homeHref?: string
  homeLabel?: string
  children?: ReactNode
}

export interface BreadcrumbProps {
  href?: string
  title?: string
  children?: ReactNode
}

// Utility Components
export interface LoadingProps {
  imageClass?: string
  className?: string
  children?: ReactNode
}

export interface IconProps {
  image?: ImageInfo
  svg?: string
  src?: string
  alt?: string
  type?: string
  className?: string
}

export interface AlertProps {
    type?: "warn" | "info" | "error" | "success",
    hideIcon?: boolean
    className?: string
    children?: ReactNode
}

export interface AlertSuccessProps {
    message?: string
}

export interface ErrorSummaryProps {
  status?: ResponseStatus|undefined,
  except?: string | string[]
  className?: string
}

// Form Components
export interface AutoFormFieldsProps {
  value: ApiRequest
  type?: string
  metaType?: MetadataType
  api: {error?:ResponseStatus}|null
  formLayout?: InputInfo[]
  configureField?: (field:InputProp) => void
  configureFormLayout?: (field:InputProp[]) => void
  hideSummary?: boolean
  flexClass?: string
  divideClass?: string
  spaceClass?: string
  fieldsetClass?: string
  onChange?: (value:any) => void
}

export interface ConfirmDeleteProps {
  onDelete?: () => void
}

export interface FormLoadingProps {
  icon?: boolean
  text?: string
}

// Format Components
export interface CellFormatProps {
  type: MetadataType,
  propType: MetadataPropertyType,
  value: Object
}

export interface PreviewFormatProps {
  value: any
  format?:FormatInfo
  includeIcon?: boolean
  includeCount?: boolean
  maxFieldLength?: number
  maxNestedFields?: number
  maxNestedFieldLength?: number
}

export interface HtmlFormatProps {
  value?: any,
  depth?: number
  fieldAttrs?: (k:string) => any
  classes?: (type:'object'|'array',tag:'div'|'table'|'thead'|'th'|'tr'|'td',depth:number,cls:string,index?:number) => string
}

export interface MarkupFormatProps {
  value: any,
  imageClass?: string
}

export interface MarkupModelProps {
  value: any,
  imageClass?: string
}

// Additional Components
export interface InputDescriptionProps {
  id: string
  description: string
}

export interface TextLinkProps {
  color?: "blue" | "purple" | "red" | "green" | "sky" | "cyan" | "indigo"
  children?: ReactNode
}

export interface NavListProps {
  title?: string
  children?: ReactNode
}

export interface NavListItemProps {
  title: string
  href: string
  icon?: ImageInfo
  iconSvg?: string
  iconSrc?: string
  iconAlt?: string
}

export interface SettingsIconsProps {
  column: Column
  isOpen: boolean
}

export interface FilterViewsProps {
  definitions?: any[]
  columns?: any[]
}

export interface FilterColumnProps {
    definitions: AutoQueryConvention[]
    column: Column
    topLeft: { x:number, y:number }
    onDone?: () => void
    onSave?: (settings:ColumnSettings) => void
}

export interface QueryPrefsProps {
    id?: string
    columns: MetadataPropertyType[]
    prefs: ApiPrefs
    maxLimit?: number
    onDone?: () => void
    onSave?: (prefs:ApiPrefs) => void
}

export interface EnsureAccessProps {
  invalidAccess?: string
  alertClass?: string
  children?: ReactNode
  onDone?: () => void
}

export interface EnsureAccessDialogProps {
  title?: string
  subtitle?: string
  invalidAccess?: string
  alertClass?: string
  onDone?: () => void
}

export interface CloseButtonProps {
  buttonClass?: string
  title?: string
  onClose?: () => void
}

export interface ModalLookupProps {
  id?: string
  refInfo: RefInfo
  skip?: number
  prefs?: ApiPrefs
  selectedColumns?:string[]|string

  allowFiltering?: boolean|null
  showPreferences?: boolean|null
  showPagingNav?: boolean|null
  showPagingInfo?: boolean|null
  showResetPreferences?: boolean|null
  showFiltersView?: boolean|null
  toolbarButtonClass?: string

  canFilter?:(column:string) => boolean

  type?: string|InstanceType<any>|Function
  modelTitle?: string
  newButtonLabel?: string
  configureField?: (field:InputProp) => void
  onDone?: (item:any) => void
}

export interface TabsProps {
    tabs: {[name:string]:React.ComponentType }
    id?: string
    param?: string
    label?: (tab:string) => string
    selected?: string
    tabClass?: string
    bodyClass?: string
    url?:boolean
    clearQuery?:boolean
}

export interface SignInProps {
  provider?: string
  title?: string
  tabs?: boolean|"false"
  oauth?: boolean|"false"
  onLogin?: (auth:AuthenticateResponse) => void
}

export interface MarkdownInputProps {
  status?: ResponseStatus|null
  id: string
  inputClass?: string
  filterClass?:(cls:string) => string
  label?: string
  labelClass?: string
  help?: string
  placeholder?: string
  value?: string

  counter?: boolean
  rows?: number
  //rules
  errorMessages?: string[]
  lang?: string
  autoFocus?: boolean
  disabled?: boolean
  helpUrl?: string
  hide?: string|MarkdownInputOptions|MarkdownInputOptions[]
  onChange?: (value:string) => void
  onClose?: () => void
}

export interface SidebarLayoutRef {
  show(): void
  hide(): void
  toggle(show:boolean): void
}
