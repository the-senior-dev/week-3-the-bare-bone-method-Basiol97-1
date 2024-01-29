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

export const MovieSliderContainer = styled.div`
  display: flex;
  flex-direction: row;
  flex-wrap: nowrap;
  justify-content: space-between;
  overflow: scroll;
  max-height: 200px;
  -ms-overflow-style: none;
  scrollbar-width: none; 
  padding-bottom: 20px;
  ::-webkit-scrollbar {
    display: none;
  }
`;

export const PrimaryButton = styled.button`
  height: 40px;
  display: flex;
  width: 200px;
  background-color: #0984e3;
  border-color: #0984e3;
  color: white;
  font-weight: 700;
  font-size: 1.2rem;
  justify-content: center;
  align-items: center;
  border-width: 0px;
  margin-right: 4px;
  margin-left: 4px;
  &:hover {
    background-color: #0984e3;
    cursor: pointer;
  }
  &:disabled {
    background-color: grey;
    cursor: normal;
  }
`;
