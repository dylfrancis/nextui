import {useLink as useAriaLink} from "@react-aria/link";
import {mergeProps} from "@react-aria/utils";
import {forwardRef} from "@nextui-org/system";
import {useDOMRef} from "@nextui-org/dom-utils";
import {clsx, __DEV__} from "@nextui-org/shared-utils";

import {StyledLink} from "./link.styles";
import {UseLinkProps, useLink} from "./use-link";
import {LinkIcon} from "./link-icon";

export interface LinkProps extends UseLinkProps {}

const Link = forwardRef<LinkProps, "a">((props, ref) => {
  const {children, as, css, linkCss, isExternal, focusProps, className, ...otherProps} =
    useLink(props);

  const domRef = useDOMRef(ref);

  const {linkProps} = useAriaLink({...otherProps, elementType: `${as}`}, domRef);

  return (
    <StyledLink
      ref={domRef}
      className={clsx("nextui-link", className)}
      css={{
        ...linkCss,
        ...css,
      }}
      {...mergeProps(linkProps, focusProps, otherProps)}
    >
      <>
        {children}
        {isExternal && <LinkIcon />}
      </>
    </StyledLink>
  );
});

if (__DEV__) {
  Link.displayName = "NextUI.Link";
}

Link.toString = () => ".nextui-link";

export default Link;