import styled from "styled-components";
import settings from "../../settings";

export const PageContainer = styled.div`
  max-width: 1300px;
  width: 100%;
  padding-left: 10px;
  padding-right: 10px;
  box-sizing: border-box;
`;

export const SectionTitle = styled.h2`
  font-size: 1.4em;
  color: ${settings.colors.foreground};
  margin-bottom: 10px;
  margin-top: 0px;
  font-weight: 600;
  padding-left: 4px;
`;

export const PageSection = styled.section`
  border-radius: 4px;
  box-shadow: 0 2px 4px ${settings.colors.shadow};
  padding: 10px;
  box-sizing: border-box;
  background-color: ${settings.colors.backgroundSecondary};
  margin-bottom: 2rem;
  margin-top: 2rem;
  padding: 1rem;
`;

export const ErrorMessage = styled.p`
  color: ${settings.colors.error};
  background-color: ${settings.colors.background};
  border-left: 5px solid ${settings.colors.error};
  padding: 10px;
  margin: 20px 0;
  border-radius: 4px;
  font-weight: bold;
`;

export const LoadingComponent = styled.div`
  color: ${settings.colors.foreground};
  background-color: ${settings.colors.background};
  border-left: 5px solid ${settings.colors.foreground};
  padding: 10px;
  margin: 20px 0;
  border-radius: 4px;
  font-weight: bold;
`;
