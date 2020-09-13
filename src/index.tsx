import * as React from 'react';
import { ChangeEvent } from "react";
import { Link, withRouter, RouteComponentProps } from 'react-router-dom';
import { 
    classNames,
    errorResponse, 
    errorResponseExcept,
    NavItem,
    trimEnd,
    safeVarName,
    pick,
    combinePaths,
    activeClassNav,
    activeClass,
    btnClasses,
    NavDefaults,
    NavLinkDefaults,
    NavbarDefaults,
    NavButtonGroupDefaults,
    LinkButtonDefaults,
    NavOptions,
} from '@servicestack/client';

interface ErrorSummaryProps {
    responseStatus: any,
    except: string | string[]
}
export const ErrorSummary: React.FC<ErrorSummaryProps> = ({ responseStatus, except }) => {
    const self = { responseStatus };
    const errorSummary = errorResponseExcept.call(self,except);
    return (errorSummary ? <div className="alert alert-danger mt-2">{errorSummary}</div> : null);
};

interface InputPropsBase {
    responseStatus?: any,
    type?: string,
    id?: string;
    placeholder?: string;
    label?: string;
    help?: string;
    inline?: boolean;
    onChange?: (value:any) => void;
}

interface InputProps extends InputPropsBase {
    type?: string;
    value?: string[]|string;
    values?: any[];
    inputClass?: string;
}

export const Input: React.FC<InputProps> = (props) => {
    let { 
        responseStatus, 
        type, 
        id,
        placeholder,
        label,
        help,
        inputClass,
        inline,
        value,
        values,
        onChange,
        ...remaining 
    } = props;

    if (!type) type = 'text';
    if (!inputClass) inputClass = 'form-control-lg';
    
    const isCheck = type == 'radio' || type == 'checkbox';;
    const self = { responseStatus };
    const errorField = id && errorResponse.call(self,id);
    const hasError = !!errorField;
    const fn = onChange;
    
    const kvpValues = (values || []).map(x => typeof x == 'string'
        ? { key: x, value: x }
        : x);

    const onInput = (e:InputEvent) => { if (fn) fn(e.target.value); };
    
    const onInputValues = (e:InputEvent) => { if (fn) fn(inputSelectedValues(e.target)); };

    const hasValue = (elValue:string) => {
        return type == 'checkbox'
            ? (value instanceof Array
                ? value.indexOf(elValue) >= 0
                : false)
            : value == elValue;
    };

    return (<div>
        {label ? <label className={isCheck ? 'form-check-label' : 'form-label'} htmlFor={id}>{label}</label> : null}
        {isCheck ?
            (<div className={classNames('form-check',{'is-invalid':hasError,'form-control':hasError})}>
                {type == 'radio' ?
                    kvpValues.map((kvp:any) => 
                        (<div key={`${id}-${kvp.key}`} className={classNames('custom-control','custom-radio',{'custom-control-inline':inline})}>
                            <input type="radio" id={`${id}-${kvp.key}`} name={id} value={kvp.key}
                                   className={classNames('custom-control-input',inputClass)} checked={value==kvp.key}
                                   onChange={onInput} />
                            <label className="custom-control-label" htmlFor={`${id}-${kvp.key}`}>{kvp.value}</label>
                        </div>)) : null}
                {type == 'checkbox' ?
                    kvpValues.map((kvp:any) => 
                        (<div key={`${id}-${kvp.key}`} className={classNames('custom-control','custom-checkbox',{'custom-control-inline':inline})}>
                            <input type="checkbox" id={`${id}-${kvp.key}`} name={id} value={kvp.key}
                                   className="form-check-input" checked={hasValue(kvp.key)} onChange={onInputValues} />
                            <label className="form-check-label" htmlFor={`${id}-${kvp.key}`}>{kvp.value}</label>
                        </div>)) : null}
                {help ? <small className="text-muted">{help}</small> : null}
            </div>)
            : null}
        {!isCheck ? <input type={type} id={id} name={id} value={value}
           className={classNames('form-control',{'is-invalid':errorField}, inputClass)}
           onChange={e => { if (fn) fn(e.target.value); }} placeholder={placeholder}
           {...remaining} /> : null}
        {!isCheck && help ? <small className="text-muted">{help}</small> : null}
        {errorField ? <div className="invalid-feedback">{errorField}</div> : null}
    </div>);

    function inputSelectedValues(input:HTMLInputElement) {
        if (input.form == null)
            throw new Error("multiple values must be within a <form> element");

        let selectedValues = [];
        let elements = input.form.elements;
        for (let i = 0; i<elements.length; i++) {
            let el = elements[i] as HTMLInputElement;
            if (el.name == input.name && el.checked) {
                selectedValues.push(el.value);
            }
        }
        return selectedValues;
    }
};


interface SelectProps extends InputPropsBase {
    selectClass?: string;
    multiple?: boolean;
    value?: string[]|string;
    values?: any[];
}

export const Select: React.FC<SelectProps> = (props) => {
    const { responseStatus, id, label, help, selectClass, multiple, value, values, onChange } = props;
    const self = { responseStatus };
    const errorField = id && errorResponse.call(self,id);
    const hasError = !!errorField;

    const kvpValues = (values || []).map(x => typeof x == 'string'
        ? { key: x, value: x }
        : x);

    const hasValue = (elValue:string) => {
        return multiple
            ? (value instanceof Array
                ? value.indexOf(elValue) >= 0
                : false)
            : value == elValue;
    };

    const fn = onChange;

    const onInputValues = (e:ChangeEvent<HTMLSelectElement>) => { if (fn) fn(multiple ? selectedOptions(e.target as any as HTMLSelectElement) : e.target.value); };

    return (<div>
        {label ? <label className="form-label" htmlFor={id}>{label}</label> : null}
        <select id={id} name={id} className={classNames('form-control',{'is-invalid':errorField}, selectClass)}
                multiple={multiple} value={value} onChange={onInputValues}>
            {kvpValues.map((kvp:any) =>
                (<option key={kvp.key} value={kvp.key}>{kvp.value}</option>))}
        </select>
        {help ? <small className="text-muted">{help}</small> : null}
        {errorField ? <div className="invalid-feedback">{errorField}</div> : null}
    </div>);
};

function selectedOptions(select:HTMLSelectElement) {
    let selectedValues = [];
    for (let i = 0; i<select.options.length; i++) {
        if (select.options[i].selected) {
            selectedValues.push(select.options[i].value);
        }
    }
    return selectedValues;
}


interface CheckBoxProps extends InputPropsBase {
    value?: boolean
    inputClass?: string;
}

export const CheckBox: React.FC<CheckBoxProps> = (props) => {
    const { responseStatus, id, value, help, onChange, inputClass } = props;
    const self = { responseStatus };
    const errorField = id && errorResponse.call(self,id);
    const fn = onChange;

    const onInput = (e:InputEvent) => { if (fn) fn(e.target.checked); };

    return (<div>
            <div className={classNames('form-check',{'is-invalid':errorField,'form-control':errorField})}>
                <input type="checkbox" id={id} name={id} onChange={onInput} checked={value} value="true"
                       className={classNames('form-check-input',{'is-invalid':errorField},inputClass)} />
                <label className="form-check-label" htmlFor={id}>{props.children}</label>
            </div>
            {help ? <small className="text-muted">{help}</small> : null}
            {errorField ? <div className="invalid-feedback">{errorField}</div> : null}
        </div>);
};

declare let global: any; // populated from package.json/jest

interface BootstrapColorProps {
    primary?: boolean;
    'outline-primary'?: boolean;
    secondary?: boolean;
    'outline-secondary'?: boolean;
    success?: boolean;
    'outline-success'?: boolean;
    info?: boolean;
    'outline-info'?: boolean;
    warning?: boolean;
    'outline-warning'?: boolean;
    danger?: boolean;
    'outline-danger'?: boolean;
    light?: boolean;
    'outline-light'?: boolean;
    dark?: boolean;
    'outline-dark'?: boolean;
}

interface BootstrapSizeProps {
    lg?: boolean;
    sm?: boolean;
    xs?: boolean;
}

interface BootstrapModifierProps {
    block?: boolean;
    vertical?: boolean;
    horizontal?: boolean;
}

type NavItemsProps = RouteComponentProps<any> & {
    items: NavItem[];

    options?: NavOptions;
    attributes?: string[];
    activePath?: string;
    baseHref?: string;
    navClass?: string;
    navItemClass?: string;
    navLinkClass?: string;
    childNavItemClass?: string;
    childNavLinkClass?: string;
    childNavMenuClass?: string;
    childNavMenuItemClass?: string;
}
type NavItemProps = RouteComponentProps<any> & {
    item: NavItem;
    options?: NavOptions;
    activePath?: string;
    navItemClass?: string;
    navLinkClass?: string;
}

export const Nav = withRouter<NavItemsProps>(({ items, options, ...remaining }) => {
    if (items == null || items.length === 0) {
        return null;
    }

    options = Object.assign(NavDefaults.forNav(options), remaining);

    return (
        <div className={options.navClass}>
            {items.map(x => <NavLink key={x.href || x.label} item={x} options={options} />)}
        </div>
    );
});

export const Navbar = withRouter<NavItemsProps>(({ items, options, ...remaining }) => {
    if (items == null || items.length === 0) {
        return null;
    }

    options = Object.assign(NavbarDefaults.forNavbar(options), remaining);
    return (<Nav items={items} options={options} />);
});

export const ALink : React.FC<any> = ({to, onClick, children, ...attrs}) => {
    if (onClick != null) {
        return (<a href="javascript:void(0)" onClick={onClick} {...attrs}>{children}</a>);
    }
    if (to.startsWith('http://') || to.startsWith('https://') || to.startsWith('//')) {
        return (<a href={to} {...attrs}>{children}</a>);
    } else {
        return (<Link to={to} {...attrs}>{children}</Link>);
    }
}

export const NavLink = withRouter<NavItemProps>(({ item, options, activePath, navItemClass, navLinkClass, history }) => {
    options = options || NavDefaults.forNav();
    if (item == null  || !NavDefaults.showNav(item, options.attributes)) {
        return null;
    }
    options.activePath = activePath || options.activePath || history.location.pathname;
    options.navItemClass = navItemClass || options.navItemClass;
    options.navLinkClass = navLinkClass || options.navLinkClass;

    const children = item.children || [];
    const hasChildren = children.length > 0;
    const navItemCls = hasChildren
        ? options.childNavItemClass
        : options.navItemClass;
    const navLinkCls = hasChildren
        ? options.childNavLinkClass
        : options.navLinkClass;

    const childProps = {};
    let id = item.id;
    if (hasChildren) {
        if (id == null) {
            id = safeVarName(item.label);
        }
        /* tslint:disable:no-string-literal */
        childProps['role'] = 'button';
        childProps['data-toggle'] = 'dropdown';
        childProps['aria-haspopup'] = 'true';
        childProps['aria-expanded'] = 'false';
        /* tslint:enable:no-string-literal */
    }
    const baseHref = trimEnd(options.baseHref || '', '/');

    return (
        <li className={classNames(item.className, navItemCls)}>
            <ALink to={baseHref + item.href} className={classNames(navLinkCls, activeClassNav(item, options.activePath))} id={id} {...childProps}>
                {item.label}
            </ALink>
            <div className={options!.childNavMenuClass} aria-labelledby={id}>
                {children.map(x => (x.label === '-'
                    ? <div className="dropdown-divider" />
                    : (<ALink to={baseHref + x.href} className={classNames(options!.childNavMenuItemClass, activeClassNav(x, options!.activePath!))}>
                        {x.label}
                       </ALink>)
                ))}
            </div>
        </li>
    );
});

export type NavButtonGroupProps = NavItemsProps & BootstrapSizeProps & BootstrapColorProps & BootstrapModifierProps;

export const NavButtonGroup = withRouter<NavButtonGroupProps>(({ items, options, ...remaining }) => {
    if (items == null || items.length === 0) {
        return null;
    }

    options = Object.assign(NavButtonGroupDefaults.forNavButtonGroup(options), remaining);
    return (
        <div className={classNames(remaining.block ? null : remaining.vertical ? 'btn-group-vertical' : options.navClass)}>
            {items.map(x => <NavLinkButton key={x.href || x.label} item={x} options={options} {...remaining} />)}
        </div>
    );
});

export const NavLinkButton = withRouter<NavItemProps>(({ item, options, activePath, navItemClass, history, ...remaining }) => {
    options = Object.assign(NavLinkDefaults.forNavLink(options), remaining);
    if (item == null || !NavDefaults.showNav(item, options.attributes)) {
        return null;
    }
    options.activePath = activePath || options.activePath || history.location.pathname;
    options.navItemClass = navItemClass || options.navItemClass;

    const baseHref = trimEnd(options.baseHref || '', '/');

    return (
        <ALink to={baseHref + item.href} id={item.id}
            className={classNames(item.className, options.navItemClass, activeClassNav(item, options.activePath), btnClasses(remaining))}>
            {item.iconClass ? <i className={item.iconClass}/> : null}
            {item.label}
        </ALink>);
});

type LinkItemProps = RouteComponentProps<any> & BootstrapColorProps & BootstrapSizeProps & BootstrapModifierProps & {
    href?: string;
    onClick?:React.MouseEventHandler<HTMLAnchorElement>;
    id?: string;
    exact?: boolean;
    className?: string;
    navItemClass?: string;
    options?: NavOptions;
}

export const LinkButton = withRouter<LinkItemProps>(({ href, exact, className, options, history, children, ...remaining }) => {
    let activePath = options != null ? options.activePath : '';
    if (!activePath) {
        activePath = history.location.pathname;
    }
    options = Object.assign(LinkButtonDefaults.forLinkButton(options), remaining);
    const hashPrefix = trimEnd(options.baseHref || '', '/');
    const attrs = pick(remaining, ['id','type','name','autofocus','disabled','value','onClick']);
    return (
        <ALink to={hashPrefix + href} {...attrs}
            className={classNames(className, options.navItemClass, activeClass(href||null, activePath, exact), btnClasses(remaining))}>
            {children}
        </ALink>);
});

type ButtonProps = BootstrapColorProps & BootstrapSizeProps & BootstrapModifierProps & {
    type?: string;
    onClick?:React.MouseEventHandler<HTMLButtonElement>;
    id?: string;
    className?: string;
}
export const Button : React.FC<ButtonProps> = ({ type, id, className, children, ...remaining }) => {
    const attrs = pick(remaining, ['id','type','name','autofocus','disabled','value','onClick']);
    return (<button {...attrs} className={classNames('btn', className, btnClasses(remaining))}>{children}</button>);
};

export const Fallback = withRouter(({ location }) => {
    React.useEffect(() => {
        if (location.pathname.indexOf('://') >= 0) {
            window.location.href = location.pathname.substring(1); // chop path / prefix
        }
    }, []);

    return (<div className="fallback">
        <h3>No matching <code>Route</code> found for <code>{location.pathname}</code></h3>
    </div>);
});

interface ForbiddenProps {
    message?: string;
    path?: string;
    role?: string;
    permission?: string;
}

export const Forbidden : React.FC<ForbiddenProps> = ({ message, path, role, permission, ...remaining }) => {
    return (<div className="forbidden">
        <h3>You are not authorized to access {path ? <code>{path}</code> : <span>this page</span>}</h3>
        {message != null
            ? <p>{message}</p>
            : role
                ? <p>Missing role <code>{role}</code></p>
                : permission
                    ? <p>Missing permission <code>{permission}</code></p>
                    : null}
    </div>);
};

interface SvgImageProps {
    id: string;
    fill?: string;
    className?: string;
    width?: number;
    height?: number;
    style?:any;
    baseUrl?: string;
}
export const SvgImage : React.FC<SvgImageProps> = ({ id, fill, className, style, width, height, baseUrl }) => {
    let svgSrc = `/metadata/svg/${id}.svg`;
    if (fill) {
        svgSrc += `?fill=` + encodeURIComponent(fill);
    }
    style = style || {};
    if (width) {
        style.width = width;
    }
    if (height) {
        style.height = height;
    }
    const src = baseUrl ? combinePaths(baseUrl, svgSrc) : svgSrc;
    return (<img src={src} className={className} style={style} />);
};
